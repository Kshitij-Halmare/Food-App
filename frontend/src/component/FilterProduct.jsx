import { CiForkAndKnife } from "react-icons/ci";

export default function FilterProduct({ category, setFilterBy }) {
    return (
        <div className="flex flex-col items-center ">
            <div 
                className="text-2xl p-4 bg-yellow-500 hover:scale-105  rounded-full cursor-pointer" 
                onClick={() => setFilterBy(category)} 
            >
                <CiForkAndKnife />
            </div>
            <p className="font-semibold font-serif">{category}</p>
        </div>
    );
}
