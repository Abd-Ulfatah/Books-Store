import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //Get Books Ti Local Storge : 
  const [books, setBook] = useState(() => {
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [];
  })

  const [form, setForm] = useState({
    id: null,
    title: "",
    auther: "",
    price: "",
    image: ""
  })

  const [isEditing, setIsEditing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // save to local Storge :
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  //handleInputChange :
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  //handleImage upload : 
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return
    //limit size 2MB :
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is To Large Max 2MB")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result })
    }
    reader.readAsDataURL(file)
  }



  //Add or Update Function : 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      setBook(books.map((b) => b.id === form.id ? form : b))
      setIsEditing(false)
    } else {
      setBook([...books, { ...form, id: Date.now() }])
    }
    resetForm()
  }

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      auther: "",
      price: "",
      image: ""
    })
  }

  // Clear All Data : 
  const clearAll = () => {
    if (!window.confirm("Delete All Books ??")) return
    localStorage.removeItem("books")
    setBook([])
  }

  const handleEdit = (book) => {
    setForm(book)
    setIsEditing(true)
  }

  const handleDelete = (id) => {
    setBook(books.filter((b) => b.id !== id))
  }

  const searchbBox = (e) => {
    setSearchQuery(e.target.value)
  }

  const viewBooks = searchQuery ?
    books.filter((book)=> book.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
    :books

  return (
    <>
      <div className="container my-4">
        <h2 className='text-center my-3'>📚Book Store</h2>
        <div className="d-flex justify-content-between ">
          <div style={{ width: "93%" }}><input type="text" className='form-control w-100' value={searchQuery} onChange={searchbBox} placeholder='Search by title' /> </div>
          <button className='btn btn-outline-danger' onClick={clearAll} >Clear All</button>
        </div>
        <form onSubmit={handleSubmit} className='d-flex gap-1 mt-3' >

          <input type="text" className='form-control' name='title' value={form.title} placeholder='Book Title' onChange={handleChange} required />
          <input type="text" className='form-control' name='auther' value={form.auther} placeholder='Book Auther' onChange={handleChange} required />
          <input type="text" className='form-control' name='price' value={form.price} placeholder='Book Price' onChange={handleChange} required />
          <input type="file" className='form-control' onChange={handleImage} />
          <button className='btn btn-primary'> {isEditing ? "Update" : "Add"}</button>
        </form>
      </div>
      <div className="row mx-5">
        {viewBooks.length === 0 && <p className='text-center mt-5'>No Books Found ...</p>}
        {
          viewBooks.map((book) => (
            <div key={book.id} className='col-sm-3 col-md-2 mt-4 ' >
              <div className="card">
                {book.image && <img src={book.image} className='card-img-top' height="150px" alt={book.title} />}
                <div className="card-body">
                  <h5>{book.title}</h5>
                  <small>Auther : {book.auther}</small>
                  <p>Price : {book.price}</p>

                  <div className="d-flex justify-content-between">
                    <button className='btn btn-dark' onClick={() => handleEdit(book)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(book.id)} >Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>


    </>
  )
}

export default App
