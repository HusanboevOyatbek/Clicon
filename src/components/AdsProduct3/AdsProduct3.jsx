import { Link } from 'react-router-dom';
import useGet from '../../hook/useGet';

function AdsProduct3() {
    const { data } = useGet({ url: "products?limit=100" });
    const products = data?.products;
    const sliceProducts = products?.slice(98)





    return (
        <>
            {sliceProducts?.map((el) => (
                <div className="w-full flex items-center justify-between h-full bg-[#F2F4F5] p-20 gap-8">
                    {/* Text Section */}
                    <div className="flex-1">
                        <h1 className="text-[48px] font-sans">
                            {el.title}
                        </h1>

                        <p className="line-clamp-3 text-[18px] text-[#475156] mt-4">
                            {el.description}
                        </p>

                        <Link
                            to={`/products/${el.id}`}
                            className="inline-block bg-[#FA8232] rounded-[3px] text-white px-6 py-4 text-[17px] font-sans mt-6 text-center"
                        >
                            Shop Now
                        </Link>
                    </div>


                    {/* Image Section */}
                    <div className="flex-1 flex justify-center">
                        <img src={el.thumbnail} alt="" className="max-w-full  h-full" />
                    </div>
                </div>


            ))}
        </>

    )
}

export default AdsProduct3;
