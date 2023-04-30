import { useQuery } from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import { getUnlisting } from '../api';
import Loading from "../components/Loading";

function Unlisting() {
    let { brandPk } = useParams();
    const { isLoading: unlistingDataLoading, data: unlistingData } = useQuery(['Unlisting', brandPk], () => getUnlisting(brandPk),
        {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000
        }
    );
    return (
        <>
            {unlistingDataLoading ?
                <Loading />
                :
                <div className="mt-10">
                    <div className="flex flex-col items-center mb-14">
                        <span className="text-2xl mb-5">미등록 상품</span>
                        <ul className="flex justify-between items-center">
                            {unlistingData.unlisting_products.length === 0 ? 
                                <span>미등록 상품 없습니다.</span>
                                :
                                unlistingData.unlisting_products.map((product, index) =>
                                    <li key={index} className="text-gray-400 list-disc mb-5">{product}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="flex flex-col items-center mb-14">
                        <span className="text-2xl mb-5">미등록 옵션</span>
                        <ul className="flex flex-col justify-between items-center">
                            {unlistingData.unlisting_options.length === 0 ? 
                                <span>미등록 옵션 없습니다.</span>
                                :
                                unlistingData.unlisting_options.map((option, index) =>
                                    <li key={index} className="text-gray-400 list-disc mb-5">{option}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            }
        </>
    );
}

export default Unlisting