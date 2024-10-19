import { CiForkAndKnife } from "react-icons/ci";
export default function FilterProduct({ category }) {
    return (
        <>
            <div className="flex flex-col items-center">
            <div className="text-2xl p-4 bg-yellow-500 rounded-full">
                <CiForkAndKnife />
            </div>
            <p className="font-semibold font-serif">{category}</p>
            </div>
        </>
    );
}