import { ChangeEvent, useState } from "react"
import { AddBook } from "../../../models/AddBook";
import { getToken } from "../../utils/Authenticated";

export const AddNewBook = () =>{

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [copies, setCopies] = useState<number>(0);
    const [category, setCategory] = useState<string>('Category');
    const [image, setImage] = useState<string|ArrayBuffer|null>();

    const[displayWarning, setDisplayWarning] = useState<boolean>(false);
    const[displaySuccess, setDisplaySuccess] = useState<boolean>(false);


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

    const submitNewBook = async () =>{
        if(title.trim()==='' || author.trim()==='' || description.trim()==='' || category.trim()==='Category' || copies<0){
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
        else{
            const newBookToAdd = new AddBook(title, author, description, copies, category, image);
            const url = `http://localhost:8080/api/admin/addBook`;
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Authorization", `Bearer ${getToken()}`)
            fetch(url,{
                method: "POST",
                headers: headers,
                body: JSON.stringify(newBookToAdd)
            })
            .then((response)=>{
                if(response.ok){
                    setDisplayWarning(false);
                    setDisplaySuccess(true);
                    setTitle('');
                    setAuthor('');
                    setDescription('');
                    setCategory('Category');
                    setCopies(0);
                    setImage(null);
                }else{
                    throw new Error("Something went wrong")
                }
            })
            .catch((error:Error)=>{
                throw new Error("Error submitting new book, because : " + error.message);
            })
        }
    }


    return(
        <div className="card mt-4">
            {
                displayWarning &&
                <div className="alert alert-warning alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplayWarning(false)}></button>
                    <strong>Failed:</strong> all fields must be filled out.
                </div>
            }
            {
                displaySuccess &&
                <div className="alert alert-success alert-dismissible fade show">
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setDisplaySuccess(false)}></button>
                    <strong>Success:</strong> new book was added.
                </div>
            }
            <div className="card-header">
                <h6>Add a New Book</h6>
            </div>
            <div className="row card-body">
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
                <div className="col-md-3 mt-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" onChange={toBase64}></input>
                </div>
                <div className="col- mt-3">
                <label className="form-label mt-2">Description</label>
                <textarea required rows={10} className="form-control" placeholder="Detail of the book" onChange={event=> setDescription(event.target.value)} value={description}></textarea>
                </div>
                <div className="col-3">
                <button className="btn btn-primary mt-3" onClick={submitNewBook}>Add Book</button>
                </div>
            </div>
        </div>
    )
}