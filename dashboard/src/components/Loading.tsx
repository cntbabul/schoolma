const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center min-h-[200px]">
            <div
                className="w-10 h-10 border-4 border-t-lamaPurple border-r-lamaYellow border-b-lamaSky border-l-transparent rounded-full animate-spin"
                role="status"
                aria-label="Loading"
            ></div>
        </div>
    );
};

export default Loading;
