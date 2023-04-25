import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getBrand, getRetrieve } from "../api";
// import Table from "../components/Table";
import Loading from "../components/Loading";
import Table2 from "../components/Table2";

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
    const { isLoading: brandDataLoading, data: brandData } = useQuery(['Brand', brandPk], () => getBrand(brandPk));
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
    // const [eventCount, setEventCount] = useState({});
    // const [events, setEvents] = useState({});
    // const [pageView, setPageView] = useState({});
    // const [visit, setVisit] = useState({});
    // async function getEvent() {
    //     if(Object.keys(selectedDate).length === 0) {
    //         return;
    //     } else {
    //         let response = await fetch(`${baseUrl}/events/${brandPk}?dateFrom=${selectedDate.dateFrom}&dateTo=${selectedDate.dateTo}`, {
    //             method : "GET",
    //             credentials: "include",
    //             headers : {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         let data = await response.json();
    //         if (response.ok) {
    //             let eventCountObj = {};
    //             listOfDate.forEach((date) => {
    //                 let count = data.filter((d) => 
    //                     d.event_date === date
    //                 );
    //                 eventCountObj[date] = count.length;
    //             });
    //             setEventCount(eventCountObj);
    //             let eventsObj = {};
    //             brand.product_set.forEach((product) =>{
    //                 eventsObj[product.name] = {};
    //                 listOfDate.forEach((date) => {
    //                     let event = data.filter((d) =>
    //                         d.product.name === product.name && d.event_date === date
    //                     );
    //                     if(event.length !== 0) {
    //                         eventsObj[product.name][date] = event;
    //                     } else {
    //                         return;
    //                     }
    //                 });
    //             });
    //             setEvents(eventsObj);
    //         }
    //     }
    // }
    // async function getPageView() {
    //     if(Object.keys(selectedDate).length === 0) {
    //         return;
    //     } else {
    //         let response = await fetch(`${baseUrl}/pages/${brandPk}?dateFrom=${selectedDate.dateFrom}&dateTo=${selectedDate.dateTo}`, {
    //             method : "GET",
    //             credentials: "include",
    //             headers : {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         let data = await response.json();
    //         if (response.ok) {
    //             let pageViewObj = {};
    //             listOfDate.forEach((date) => {
    //                 let page = data.find((d) => 
    //                     d.page_date === date
    //                 );
    //                 if(page) {
    //                     pageViewObj[date] = page;
    //                 } else {
    //                     return;
    //                 }
    //             });
    //             setPageView(pageViewObj);
    //         }
    //     }
    // }
    // async function getVisit() {
    //     if(Object.keys(selectedDate).length === 0) {
    //         return;
    //     } else {
    //         let response = await fetch(`${baseUrl}/visits/${brandPk}?dateFrom=${selectedDate.dateFrom}&dateTo=${selectedDate.dateTo}`, {
    //             method : "GET",
    //             credentials: "include",
    //             headers : {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         let data = await response.json();
    //         if (response.ok) {
    //             let visitObj = {};
    //             listOfDate.forEach((date) => {
    //                 let visit = data.find((d) => 
    //                     d.visit_date === date
    //                 );
    //                 if(visit) {
    //                     visitObj[date] = visit;
    //                 } else {
    //                     return;
    //                 }
    //             });
    //             setVisit(visitObj);
    //         }
    //     }
    // }
    // function dateList() {
    //     let result = [];
    //     let curDate = new Date(selectedDate.dateFrom);
    //     while(curDate <= new Date(selectedDate.dateTo)) {
    //         result.push(curDate.toISOString().split("T")[0]);
    //         curDate.setDate(curDate.getDate() + 1);
    //     }
    //     setListOfDate(result);
    // }
    useEffect(() => {
        if(!brandDataLoading) {
            setBrandName(brandData.name);
        }
    }, [brandDataLoading]);
    // useEffect(() => {
    //     getEvent();
    // }, [selectedDate, completeData]);
    // useEffect(() => {
    //     getPageView();
    // }, [selectedDate, completeData]);
    // useEffect(() => {
    //     getVisit();
    // }, [selectedDate, completeData]);
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
                                // <Table brand={brand} completeData={completeData} listOfDate={listOfDate} brandPk={brandPk} setSelectedDate={setSelectedDate} eventCount={eventCount} events={events} pageView={pageView} visit={visit} />
                                <Table2 brandData={brandData} completeData={completeData} listOfDate={listOfDate} brandPk={brandPk} />
                            }
                        </>
                    }
                </>
            }
        </>
    );
}

export default BrandDetail;