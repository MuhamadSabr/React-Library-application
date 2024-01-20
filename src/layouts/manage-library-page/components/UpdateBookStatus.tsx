import { ChangeEvent, useRef, useState } from "react"
import { getToken } from "../../utils/Authenticated";
import { Book } from "../../../models/Book";

export const UpdateBook = () =>{

    const [id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [copies, setCopies] = useState<number>(0);
    const [copiesAvailable, setCopiesAvailable] = useState<number>(0);
    const [category, setCategory] = useState<string>('Category');
    const [image, setImage] = useState<string|ArrayBuffer|null>();

    const fileInputRef = useRef<HTMLInputElement|null>(null);

    const[displayWarning, setDisplayWarning] = useState<boolean>(false);
    const[displayFetchError, setDisplayFetchError] = useState<boolean>(false);
    const[displaySuccess, setDisplaySuccess] = useState<boolean>(false);
    const[displayDeleteSuccess, setDisplayDeleteSuccess] = useState<boolean>(false);


    const handleCategoryChange = (event:ChangeEvent<HTMLSelectElement>) =>{
        setCategory(event.target.value);
    }

    const toBase64 = (event:ChangeEvent<HTMLInputElement>) =>{
        if(event.target.files){
            if (event.target.files[0].type.startsWith('image/')){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[0])
                reader.onload = function () {
                    setImage(reader.result);
                };
                reader.onerror = function(error) {
                    console.log(error);
                }
            }
        }
    }


    const fetchBook = async () =>{
        const url = `http://localhost:8080/api/books/${id}`;
        fetch(url)
        .then((response) =>response.json())
        .then((response)=>{
            setTitle(response.title);
            setAuthor(response.author);
            setDescription(response.description);
            setCopies(response.copies);
            setCopiesAvailable(response.copiesAvailable);
            setCategory(response.category);
            setImage(response.image);
            setDisplayFetchError(false);
        })
        .catch((error:Error)=>{
            setTitle('');
            setAuthor('');
            setDescription('');
            setCategory('Category');
            setCopies(0);
            setCopiesAvailable(0);
            setImage(null);
            if(fileInputRef.current){
                fileInputRef.current.value='';
            }
            setDisplayFetchError(true);
        })
    }


    const cancelUpdate = () =>{
        setDisplayWarning(false);
        setDisplaySuccess(false);
        setId('');
        setTitle('');
        setAuthor('');
        setDescription('');
        setCategory('Category');
        setCopies(0);
        setCopiesAvailable(0);
        setImage(null);
        if(fileInputRef.current){
            fileInputRef.current.value='';
        }
    }


    const submitUpdatedBook = async () =>{
        if(id.trim()==='' || title.trim()==='' || author.trim()==='' || description.trim()==='' || category.trim()==='Category' || copies<0){
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
        else{
            const updatedBook = new Book(+id, title, author, description, copies, copiesAvailable, category, image);
            const url = "http://localhost:8080/api/admin/updateBook";
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${getToken()}`)
            fetch(url,{
                method: "PUT",
                headers: headers,
                body: JSON.stringify(updatedBook)
            })
            .then((response)=>{
                if(response.ok){
                    setDisplayWarning(false);
                    setDisplaySuccess(true);
                    setId('');
                    setTitle('');
                    setAuthor('');
                    setDescription('');
                    setCategory('Category');
                    setCopies(0);
                    setCopiesAvailable(0);
                    setImage(null);
                    if(fileInputRef.current){
                        fileInputRef.current.value='';
                    }
                }else{
                    throw new Error("Something went wrong")
                }
            })
            .catch((error:Error)=>{
                throw new Error("Error submitting updated book, because : " + error.message);
            })
        }
    }


    const deleteBook = async () =>{
        const url = `http://localhost:8080/api/admin/deleteBook/${id}`;
        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", `Bearer ${getToken()}`)
        fetch(url,{
            method: "DELETE",
            headers: headers,
        })
        .then((response)=>{
            if(response.ok){
                setDisplayWarning(false);
                setDisplaySuccess(false);
                setDisplayFetchError(false);
                setDisplayDeleteSuccess(true);
                setId('');
                setTitle('');
                setAuthor('');
                setDescription('');
                setCategory('Category');
                setCopies(0);
                setCopiesAvailable(0);
                setImage(null);
                if(fileInputRef.current){
                    fileInputRef.current.value='';
                }
            }else{
                throw new Error("Something went wrong")
            }
        })
        .catch((error:Error)=>{
            setTitle('');
            setAuthor('');
            setDescription('');
            setCategory('Category');
            setCopies(0);
            setCopiesAvailable(0);
            setImage(null);
            if(fileInputRef.current){
                fileInputRef.current.value='';
            }
            setDisplaySuccess(false);
            setDisplayDeleteSuccess(false);
            setDisplayWarning(false);
            setDisplayFetchError(true);
        })
    }


    return(
        <div className="card mt-4">
            {
                displayWarning &&
                <div className="alert alert-warning alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplayWarning(false)}></button>
                    <strong>Failed:</strong> except for image, all fields must be filled out.
                </div>
            }
            {
                displayFetchError &&
                <div className="alert alert-warning alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplayFetchError(false)}></button>
                    <strong>Failed:</strong> No book with such book ID exists.
                </div>
            }
            {
                displaySuccess &&
                <div className="alert alert-success alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplaySuccess(false)}></button>
                    <strong>Success:</strong> book was updated.
                </div>
            }
                        {
                displayDeleteSuccess &&
                <div className="alert alert-success alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplayDeleteSuccess(false)}></button>
                    <strong>Success:</strong> book was deleted.
                </div>
            }
            <div className="card-header">
                <h6>Update or Delete Book</h6>
            </div>
            <div className="row card-body">          
                <div className=" input-group mb-3">
                    <input type="text" className="form-control" placeholder="Fetch book by book ID to update" onChange={(event)=> setId(event.target.value)} value={id}/>
                    <button className="btn btn-primary" type="button" onClick={fetchBook}>Fetch</button>
                    <button className="btn btn-dark" type="button" onClick={cancelUpdate}>Cancel</button>
                    <button className="btn btn-danger" type="button" onClick={deleteBook}>Delete</button>
                </div>
                <div className="col-md-5">
                    <label className="form-label">Title</label>
                    <input type="text" required className="form-control" placeholder="Title" onChange={event=> setTitle(event.target.value)} value={title}></input>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Author</label>
                    <input type="text" required className="form-control" placeholder="Author" onChange={event=> setAuthor(event.target.value)} value={author}></input>
                </div>
                <div className="col-md-3">
                    <label className="form-label">Category</label>
                    <select required className="form-select" onChange={handleCategoryChange} value={category}>
                        <option value="Category">Category</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Data">Data</option>
                        <option value="FE">Front-end</option>
                        <option value="BE">Back-end</option>
                    </select>
                </div>
                <div className="col-md-2 mt-3">
                    <label className="form-label">Copies</label>
                    <input type="number" required className="form-control" onChange={event=> setCopies(+event.target.value)} value={copies}></input>
                </div>
                <div className="col-md-2 mt-3">
                    <label className="form-label">Copies Available</label>
                    <input type="number" required className="form-control" onChange={event=> setCopiesAvailable(+event.target.value)} value={copiesAvailable}></input>
                </div>
                <div className="col-md-4 mt-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={toBase64} ref={fileInputRef}></input>
                </div>
                <div className="col- mt-3">
                <label className="form-label mt-2">Description</label>
                <textarea required rows={10} className="form-control" placeholder="Detail of the book" onChange={event=> setDescription(event.target.value)} value={description}></textarea>
                </div>
                <div className="col-3">
                <button className="btn btn-primary mt-3" onClick={submitUpdatedBook}>Update Book</button>
                </div>
            </div>
        </div>
    )
}