import React, {useState} from 'react';
import {storage} from "../../firebase";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import {getFirestore, collection, getDocs, addDoc, doc, deleteDoc} from 'firebase/firestore';
import ProductCard from "../../components/ProductCard/ProductCard";
import BackdropComponent from "../../components/Backdrop/BackdropComponent";
import './style.css';

const Products = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [progPercent, setProgPercent] = useState(0);
  const [products, setProducts] = useState([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  // подключение к firestore
  const db = getFirestore();
  // ссылка на определенную коллекцию (в данном случае products)
  const collectionRef = collection(db, 'products');
  // получение всех элементов коллекции
  getDocs(collectionRef)
    .then((snapshot) => {
      // преобразование полученного результа в привычный json
      let productsData = [];
      snapshot.docs.forEach((doc) => {
        productsData.push({...doc.data(), id: doc.id})
      })
      setProducts(productsData);
    }).catch((e) => console.log(e.message))

  const uploadFile = (file) => {
    // заливка файла в storage
    const storageRef = ref(storage, `/products/${file.name}`);
    // получение данных о прогрессе заливки
    const loading = uploadBytesResumable(storageRef, file);
    loading.on('state_changed', (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgPercent(progress)
      },
      (e) => console.log(e),
      () => {
      // получение ссылки на залитый файл
        getDownloadURL(loading.snapshot.ref)
          .then((url) => {
            // добавление продукта в коллекцию с ссылкой на картинку
            addDoc(collectionRef, {
              title,
              price,
              url,
              filename: file.name
            }).then(() => setFile(null))
          })
          .then(() => {
            setPrice('');
            setProgPercent(0);
            setTitle('');
            setShowBackdrop(false);
          });
      }
    );
  };

  const removeProduct = (id, filename) => {
    // нахождение нужного документа(doc принимает 3 аргумента: ссылка на базу, ссылка на коллекцию, id документа)
    const docRef = doc(db, 'products', id);
    // нахождения файла в хранилище
    const imageRef = ref(storage, `products/${filename}`);
    // удаление документа
    deleteDoc(docRef)
      .then(() => console.log('success'))
      .catch((e) => console.log(e.message));
    // удаление картинки из хранилища
    deleteObject(imageRef)
      .then(() => console.log('success'))
      .catch((error) => console.log(error));
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    if (file && title !== '' && price !== '') {
      setShowBackdrop(true);
      uploadFile(file);
    }
  };

  const productsJSX = products.map((product) => {
    return (
      <ProductCard
        key={product.id}
        title={product.title}
        image={product.url}
        price={product.price}
        remove={() => removeProduct(product.id, product.filename)}
      />
    )
  });

  return (
    <div className='products container'>
      <BackdropComponent term={showBackdrop}/>
      <form className="addProduct" onSubmit={formSubmit}>
        <h3>+ Add Product</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className='addProductInput'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={price}
          placeholder="Price"
          className='addProductInput'
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <p style={{margin: '5px'}}>Upload {progPercent}%</p>
        <button type='submit' style={{cursor: 'pointer'}}>add</button>
      </form>
      {productsJSX}
    </div>
  );
};

export default Products;
