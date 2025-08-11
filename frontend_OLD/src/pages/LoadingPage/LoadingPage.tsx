export default function Loading() {
    return (
        <div className="align-middle flex flex-col h-full items-center w-full pt-10 pb-10">
            <span className="text-x text-black font-bold text-center mb-2">
                Loading...
            </span>
            <label className="text-sm italic text-gray-400 text-center mb-2">
                This could take a moment.
            </label>
        </div>
    );
};
