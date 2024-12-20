const paginateHelper = ({
    currentPage,
    pageSize
}) => {
    //@ts-ignore
    // const offset = parseInt((currentPage - 1) * pageSize, 10);
    // const limit = parseInt(pageSize, 10);
    return {
        currentPage,
        pageSize,
    };
}

export default paginateHelper;
