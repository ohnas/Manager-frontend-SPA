import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getBrand, getRetrieve } from "../api";
import Loading from "../components/Loading";
import Table from "../components/Table";

function BrandDetail() {
    const { 
        brandName: [setBrandName],
    } = useOutletContext();
    let { brandPk } = useParams();
    const [noData, setNodata] = useState(true);
    const [formData, setFormData] = useState();
    const [selectedDate, setSelectedDate] = useState({});
    const [listOfDate, setListOfDate] = useState([]);
    const [isDateLoading, setIsDateLoading] = useState();
    const [maxDate, setMaxDate] = useState();
    const { register, handleSubmit } = useForm();
    const { isLoading: brandDataLoading, data: brandData } = useQuery(['Brand', brandPk], () => getBrand(brandPk),
        {
            refetchOnWindowFocus: false,
        }
    );
    const { isLoading: completeDataLoading, data: completeData } = useQuery(['Retrieve', brandPk, formData], () => getRetrieve(brandPk, formData),
        {
            enabled: !!formData,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        }
    );
    function onSubmit(retrieveData) {
        setIsDateLoading(true);
        setSelectedDate({
            "dateFrom" : retrieveData.dateFrom,
            "dateTo" : retrieveData.dateTo,
        });
        setNodata(false);
        setFormData(retrieveData);
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
    const maxDateVale = (() => {
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1));
        let month = yesterday.getMonth() + 1;
        if(month < 10) {
            month = `0${month}`
        }
        let date = yesterday.getDate();
        if(date < 10) {
            date = `0${date}`
        }
        const yesterdayValue = `${yesterday.getFullYear()}-${month}-${date}`;
        setMaxDate(yesterdayValue);
    });
    useEffect(() => {
        if(!brandDataLoading) {
            setBrandName(brandData.name);
        }
    }, [brandDataLoading]);
    useEffect(() => {
        maxDateVale();
    }, []);
    useEffect(() => {
        dateList();
    }, [selectedDate]);
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
                        <input {...register("dateFrom", {required:true})} name="dateFrom" id="dateFrom" type={"date"} max={maxDate} className="border-2 rounded-md w-56 border-gray-200 text-center -ml-5" />
                        <label htmlFor="retrieve_date_to">TO</label>
                        <input {...register("dateTo", {required:true})} name="dateTo" id="dateTo" type={"date"} max={maxDate} className="border-2 rounded-md w-56 border-gray-200 text-center -ml-5" />
                        <button className="border-solid border-2 border-emerald-300 rounded-md w-28 h-12 text-black">조회</button> 
                        <Link to={`/brands/${brandPk}/unlisting`}>
                            <button className="border-solid border-2 border-red-300 rounded-md w-28 h-12 text-black">미등록 조회</button> 
                        </Link>
                    </form>
                    {noData ? 
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
                                <Table brandData={brandData} completeData={completeData} listOfDate={listOfDate} brandPk={brandPk} />
                            }
                        </>
                    }
                </>
            }
        </>
    );
}

export default BrandDetail;