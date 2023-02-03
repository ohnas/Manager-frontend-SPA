import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { baseUrl } from "../api";
import Table from "../components/Table";
import Loading from "../components/Loading";

function BrandDetail() {
    const { 
        brandName: [setBrandName],
    } = useOutletContext();
    let {brandPk} = useParams();
    const [brand, setBrand] = useState({});
    const [completeData, setCompleteData] = useState([]);
    const [selectedDate, setSelectedDate] = useState({});
    const [listOfDate, setListOfDate] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const { register, handleSubmit } = useForm();
    const [maxDate, setMaxDate] = useState();
    async function brandDetail() {
        let response = await fetch(`${baseUrl}/brands/${brandPk}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        setBrand(data);
        setBrandName(data.name);
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
    async function onSubmit(retrieveData) {
        setSelectedDate({
            "dateFrom" : retrieveData.dateFrom,
            "dateTo" : retrieveData.dateTo,
        });
        setIsLoading(true);
        let response = await fetch(`${baseUrl}/sales/?saleSite=${retrieveData.saleSite}&dateFrom=${retrieveData.dateFrom}&dateTo=${retrieveData.dateTo}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let saleData = await response.json();
        if (response.ok) {
            setCompleteData(saleData);
            setIsLoading(false);
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
    }
    useEffect(() => {
        brandDetail();
    }, []);
    useEffect(() => {
        maxDateVale();
    }, []);
    useEffect(() => {
        dateList();
    }, [selectedDate]);
    return (
        <>
            { Object.keys(brand).length === 0 ? 
                    <div className="flex flex-col mt-32 justify-center items-center">
                        <span>There is no Brand Detail.</span>
                    </div>
                :
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-evenly mt-5" >
                        <select {...register("saleSite", {required:true})} name="saleSite" className="border-2 rounded-md w-72 border-gray-200 text-center">
                            <option value="">Choose a sale site</option>
                            { brand.site_set.map((site) => (
                                site.kind === "sale_site" ? 
                                    <option key={site.pk} value={site.pk}>{site.name}</option>
                                :
                                    null
                            ))}
                        </select>
                        <select {...register("advertisingSite", {required:true})} name="advertisingSite" className="border-2 rounded-md w-72 border-gray-200 text-center">
                            <option value="">Choose an advertising site</option>
                            { brand.site_set.map((site) => (
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
                        <button className="hover:border-b-2 border-purple-500">RETRIEVE</button>
                    </form>
                    {isLoading ? 
                            <Loading />
                        :
                            <Table brand={brand} completeData={completeData} listOfDate={listOfDate} isLoading={isLoading}/>
                    }
                </>
            }
        </>
    );
}

export default BrandDetail;