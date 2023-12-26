
export const Pagination:React.FC<{currentPage:number ; totalNumberOfPages:number; paginate:(page:number)=>void}> = (props) =>{

    const currentPage = props.currentPage;
    const totalNumberOfPages = props.totalNumberOfPages;
    const paginationPages:any[]= [];

    const pages = ()=>{
        
        let start = currentPage-5 > 0 ? currentPage-5 :
                    currentPage-4 > 0 ? currentPage-4 :
                    currentPage-3 > 0 ? currentPage-3 :
                    currentPage-2 > 0 ? currentPage-2 : 1;

        let  end  = totalNumberOfPages >= currentPage+5 ? currentPage+5  :
                    totalNumberOfPages === currentPage+4 ? currentPage+4  :
                    totalNumberOfPages === currentPage+3 ? currentPage+3 :
                    totalNumberOfPages === currentPage+2 ? currentPage+2 :
                    totalNumberOfPages === currentPage+1 ? currentPage+1 : currentPage;

        currentPage===1 ?
        paginationPages.push(<li key={-1} className="page-item disabled">
             <button onClick={()=> props.paginate(1)} className="page-link">First</button>
             </li>) :
        paginationPages.push(<li key={-1} className="page-item"> 
        <button onClick={()=> props.paginate(1)} className="page-link">First</button>
        </li>)

        for(let i=start; i<=end; i++){
            paginationPages.push(<li key={i} className={i===currentPage ? "page-item active" : "page-item"} >
                    <button onClick={()=> props.paginate(i)} className="page-link">{i}</button>
                </li>)
        }

        props.currentPage>=totalNumberOfPages ?
        paginationPages.push(<li key={-2} className="page-item disabled">
             <button onClick={()=> props.paginate(totalNumberOfPages)} className="page-link">Last</button>
             </li>) :
        paginationPages.push(<li key={-2} className="page-item">
            <button onClick={()=> props.paginate(totalNumberOfPages)} className="page-link">Last</button>
        </li>)

        return paginationPages;
    }

    return(
        <nav>
            <ul className="pagination">
                
                {
                    pages()
                }
            </ul>
        </nav>
    );
}