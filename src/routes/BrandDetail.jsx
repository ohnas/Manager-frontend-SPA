import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getBrand, getRetrieve } from "../api";
import Loading from "../components/Loading";
import Table from "../components/Table";
import ErrorPage from "../components/ErrorPage";


function BrandDetail() {
    const { setBrandName, formData, setFormData } = useOutletContext();
    let { brandPk } = useParams();
    const [noData, setNodata] = useState(true);
    const [selectedDate, setSelectedDate] = useState({});
    const [listOfDate, setListOfDate] = useState([]);
    const [isDateLoading, setIsDateLoading] = useState();
    const [maxDate, setMaxDate] = useState();
    const [minDate, setMinDate] = useState();
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const { register, handleSubmit, reset } = useForm();
    const { isLoading: brandDataLoading, data: brandData } = useQuery(['Brand', brandPk], () => getBrand(brandPk),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: completeDataLoading, data: completeData, isError: completeDataError } = useQuery(['Retrieve', brandPk, formData], () => getRetrieve(brandPk, formData),
        {
            enabled: !!formData,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    function onSubmit(retrieveData) {
        setIsDateLoading(true);
        retrieveData.dateFrom = dateFrom;
        retrieveData.dateTo = dateTo;
        if(retrieveData.dateFrom === '' || retrieveData.dateTo === '') {
            alert('날짜를 입력해주세요')
            return;
        } else {
            setSelectedDate({
                "dateFrom" : retrieveData.dateFrom,
                "dateTo" : retrieveData.dateTo,
            });
            setNodata(false);
            setFormData(retrieveData);
        }
    }
    function dateList() {
        let result = [];
        let curDate = new Date(selectedDate.dateFrom);
        while(curDate <= new Date(selectedDate.dateTo)) {
            result.push(curDate.toISOString().split("T")[0]);
            curDate.setDate(curDate.getDate() + 1);
        }
        setListOfDate(result);
        setIsDateLoading(false);
    }
    function handleDateFrom(event) {
        setDateFrom(event.target.value);
    }
    function handleDateTo(event) {
        setDateTo(event.target.value);
    }
    function dateFilter(event) {
        const curretId = event.target.id;
        const day = new Date();
        const yesterday = new Date(day.setDate(day.getDate() - 1));
        let month = yesterday.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        let date = yesterday.getDate();
        if(date < 10) {
            date = `0${date}`
        }
        const yesterdayValue = `${yesterday.getFullYear()}-${month}-${date}`;
        if(curretId === 'today') {
            const newDay = new Date();
            const today = new Date(newDay.setDate(newDay.getDate()));
            let month = today.getMonth() + 1;
            if(month < 10) {
                month = `0${month}`
            }
            let date = today.getDate();
            if(date < 10) {
                date = `0${date}`
            }
            const todayValue = `${today.getFullYear()}-${month}-${date}`;
            setDateFrom(todayValue);
            setDateTo(todayValue);
        } else if(curretId === 'yesterday') {
            setDateFrom(yesterdayValue);
            setDateTo(yesterdayValue);
        } else if(curretId === '7days') {
            const sevendays = new Date(day.setDate(day.getDate() - 7));
            let month = sevendays.getMonth() + 1;
            if(month < 10) {
                month = `0${month}`
            }
            let date = sevendays.getDate();
            if(date < 10) {
                date = `0${date}`
            }
            const sevendaysValue = `${sevendays.getFullYear()}-${month}-${date}`;
            setDateFrom(sevendaysValue);
            setDateTo(yesterdayValue);
        } else if(curretId === '14days') {
            const fourteendays = new Date(day.setDate(day.getDate() - 14));
            let month = fourteendays.getMonth() + 1;
            if(month < 10) {
                month = `0${month}`
            }
            let date = fourteendays.getDate();
            if(date < 10) {
                date = `0${date}`
            }
            const fourteendaysValue = `${fourteendays.getFullYear()}-${month}-${date}`;
            setDateFrom(fourteendaysValue);
            setDateTo(yesterdayValue);
        } else if(curretId === '30days') {
            const thirtydays = new Date(day.setDate(day.getDate() - 30));
            let month = thirtydays.getMonth() + 1;
            if(month < 10) {
                month = `0${month}`
            }
            let date = thirtydays.getDate();
            if(date < 10) {
                date = `0${date}`
            }
            const thirtydaysValue = `${thirtydays.getFullYear()}-${month}-${date}`;
            setDateFrom(thirtydaysValue);
            setDateTo(yesterdayValue);
        }
    }
    const maxDateVale = (() => {
        const day = new Date();
        const today = new Date(day.setDate(day.getDate()));
        let month = today.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        let date = today.getDate();
        if(date < 10) {
            date = `0${date}`
        }
        const todayValue = `${today.getFullYear()}-${month}-${date}`;
        setMaxDate(todayValue);
    });
    const minDateVale = (() => {
        const today = new Date();
        const minDay = new Date(today.setDate(today.getDate() - 32));
        let month = minDay.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        let date = minDay.getDate();
        if(date < 10) {
            date = `0${date}`
        }
        const minDayValue = `${minDay.getFullYear()}-${month}-${date}`;
        setMinDate(minDayValue);
    });
    useEffect(() => {
        if(brandDataLoading === false) {
            setBrandName(brandData.name);
        }
    }, [brandDataLoading, brandPk]);
    useEffect(() => {
        reset(
            {
                "saleSite":"",
                "advertisingSite":"",
            }
        );
    }, [brandPk]);
    useEffect(() => {
        maxDateVale();
        minDateVale();
    }, []);
    useEffect(() => {
        dateList();
    }, [selectedDate]);
    console.log(formData);
    return (
        <>
            { brandDataLoading ? 
                <span>Loading...</span> 
                :
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-evenly mt-5" >
                        <select {...register("saleSite", {required:true})} name="saleSite" className="border-2 rounded-md w-72 border-gray-200 text-center">
                            <option value="">Choose a sale site</option>
                            { brandData.site_set.map((site) => (
                                site.kind === "sale_site" ? 
                                    <option key={site.pk} value={site.pk}>{site.name}</option>
                                :
                                    null
                            ))}
                        </select>
                        <select {...register("advertisingSite", {required:true})} name="advertisingSite" className="border-2 rounded-md w-72 border-gray-200 text-center">
                            <option value="">Choose an advertising site</option>
                            { brandData.site_set.map((site) => (
                                site.kind === "advertising_site" ? 
                                    <option key={site.pk} value={site.pk}>{site.name}</option>
                                :
                                    null
                            ))}
                        </select>
                        <label htmlFor="dateFrom">FROM</label>
                        <input {...register("dateFrom")} onChange={handleDateFrom} value={dateFrom} name="dateFrom" id="dateFrom" type={"date"} min={minDate} max={maxDate} className="border-2 rounded-md w-56 border-gray-200 text-center -ml-5" />
                        <label htmlFor="retrieve_date_to">TO</label>
                        <input {...register("dateTo")} onChange={handleDateTo} value={dateTo} name="dateTo" id="dateTo" type={"date"} min={minDate} max={maxDate} className="border-2 rounded-md w-56 border-gray-200 text-center -ml-5" />
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center justify-between mb-2">
                                <span id="today" onClick={dateFilter} className="border-b-2 text-xs text-center">오늘</span>
                                <span id="yesterday" onClick={dateFilter} className="border-b-2 text-xs text-center">어제</span>
                                <span id="7days" onClick={dateFilter} className="border-b-2 text-xs text-center">최근 7일</span>
                            </div>
                            <div className="flex flex-row items-center justify-between">
                                <span id="14days" onClick={dateFilter} className="border-b-2 text-xs text-center mr-2">최근 14일</span>
                                <span id="30days" onClick={dateFilter} className="border-b-2 text-xs text-center">최근 30일</span>
                            </div>
                        </div>
                        <button className="border-solid border-2 border-emerald-300 rounded-md w-28 h-12 text-black">조회</button> 
                        <Link to={`/brands/${brandPk}/unlisting`}>
                            <button className="border-solid border-2 border-red-300 rounded-md w-28 h-12 text-black">미등록 조회</button> 
                        </Link>
                    </form>
                    {noData || formData === null ? 
                        <div className="flex justify-center items-center h-screen">
                            <div className="flex justify-center items-center">
                                <span className="text-gray-400">No data.</span>
                            </div>
                        </div>
                        :
                        <>
                            {completeDataLoading || isDateLoading ? 
                                <Loading />
                                :
                                <>
                                {completeDataError ? 
                                    <ErrorPage />
                                    :
                                    <Table brandData={brandData} completeData={completeData} listOfDate={listOfDate} brandPk={brandPk} />
                                }
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}

export default BrandDetail;