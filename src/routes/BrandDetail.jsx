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
    const [completeData, setCompleteData] = useState({});
    const [eventCount, setEventCount] = useState({});
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [listOfDate, setListOfDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        if (response.ok) {
            setBrand(data);
            setBrandName(data.name);
        }
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
        if (retrieveData.dateTo < retrieveData.dateFrom) {
            alert("조회 조건을 확인하세요");
            return;
        } 
        setSelectedDate({
            "dateFrom" : retrieveData.dateFrom,
            "dateTo" : retrieveData.dateTo,
        });
        setIsLoading(true);
        let response = await fetch(`${baseUrl}/retrieves/?brandPk=${brandPk}&saleSite=${retrieveData.saleSite}&advertisingSite=${retrieveData.advertisingSite}&dateFrom=${retrieveData.dateFrom}&dateTo=${retrieveData.dateTo}`, {
            method : "GET",
            credentials: "include",
            headers : {
                'Content-Type': 'application/json',
            },
        });
        let data = await response.json();
        if (response.ok) {
            setCompleteData(data);
            setIsLoading(false);
        }
    }
    async function getEvent() {
        if(Object.keys(selectedDate).length === 0) {
            return;
        } else {
            let response = await fetch(`${baseUrl}/events/${brandPk}?dateFrom=${selectedDate.dateFrom}&dateTo=${selectedDate.dateTo}`, {
                method : "GET",
                credentials: "include",
                headers : {
                    'Content-Type': 'application/json',
                },
            });
            let data = await response.json();
            if (response.ok) {
                let eventCountObj = {};
                listOfDate.forEach((date) => {
                    let count = data.filter((d) => 
                        d.event_date === date
                    );
                    eventCountObj[date] = count.length;
                });
                setEventCount(eventCountObj);
                let eventsObj = {};
                brand.product_set.forEach((product) =>{
                    eventsObj[product.name] = {};
                    listOfDate.forEach((date) => {
                        let event = data.filter((d) =>
                            d.product.name === product.name && d.event_date === date
                        );
                        if(event.length !== 0) {
                            eventsObj[product.name][date] = event;
                        } else {
                            return;
                        }
                    });
                });
                setEvents(eventsObj);
            }
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
    }, [brandPk]);
    useEffect(() => {
        getEvent();
    }, [selectedDate, completeData]);
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
                            <Table brand={brand} completeData={completeData} listOfDate={listOfDate} brandPk={brandPk} setSelectedDate={setSelectedDate} eventCount={eventCount} events={events} />
                    }
                </>
            }
        </>
    );
}

export default BrandDetail;