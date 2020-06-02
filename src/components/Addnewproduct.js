import React, {useState,useCallback, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col,FormControl, Form ,Image, Button,Alert} from 'react-bootstrap';
import { Slider,Typography} from '@material-ui/core';
import Cropper from 'react-easy-crop'
import { styles } from './styles'
import getCroppedImg from './cropImage'
import allActions from '../redux/actions/AllActions'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Axios from 'axios';
class model{
     constructor(ProductImage, ProductName){
         this.ProductImage = ProductImage;
         this.ProductName = ProductName;
     }
}
const App =() =>{
   
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imgae, setImgae] = useState({src:require('../content/default.jpg')})
  const [croppedImage, setCroppedImage] = useState(null)
  const [trimImage, setTrimImage] = useState({src:require('../content/default.jpg')})
  const [newproduct, setNewProduct] =useState({ProductID :'', ProductDescription :'', CategoryID :'',ProductImagePath:'', ProductName:'', ProductPrice:'', Quantity:'', CategoryName:''})
  const [checkInput, setCheckInput] = useState({ imageName:"", warringMessage:"", isInCorrectPrice: false, isCorrectPrice: false, isInCorrectQty: false, isCorrectQty : false  , ishidden: 'hidden'})
  const [products, setNewProducts] =useState({arr:[]})
  const data = useSelector(state => state.product.category)
  const dispatch = useDispatch();
  const handleuploadImage = (e) => {
   if(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jepg"){
    const  reader = new FileReader();
    reader.onload = function(){
        let dataURL = reader.result;
        setImgae({...imgae, src : dataURL})
      };
    reader.readAsDataURL(e.target.files[0]);
    setCheckInput({...checkInput, imageName : e.target.files[0].name,  ishidden : 'hidden' })
   }else{
    setCheckInput({...checkInput, warringMessage : 'only .jpeg and .png picture allowed',  ishidden : '' })
   }
  }
  useEffect(() => {
      dispatch(allActions.AllCategoryAction.setCategory({type:"DEFAULTCATEGORY"}));           
},[dispatch]); 
const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgae.src,
        croppedAreaPixels,
        rotation
      )
      setTrimImage({...trimImage, src :croppedImage })
      setNewProduct({...newproduct, ProductImagePath : croppedImage })
     
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, imgae.src, newproduct, rotation, trimImage])
  const onChagneProductInfo = (e) =>{
    switch(e.target.id){
      case "Price":  
        if(!/^(\-(\d*))$/.test(e.target.value)){
          setCheckInput({...checkInput,  isCorrectPrice: true, isInCorrectPrice: false  })
          setNewProduct({...newproduct,  ProductPrice : e.target.value, ProductID : products.arr.length.toString() })
        }else{
          setCheckInput({...checkInput, warringMessage : 'the number must be positive',isCorrectPrice: false,  isInCorrectPrice: true })
          setNewProduct({...newproduct,  ProductPrice : 0 })
         
        }
      break ;
      case "ProductName":
        setNewProduct({...newproduct, ProductName : e.target.value, ProductID : products.arr.length.toString()})
      break ;
      case "Quantity":
          if(!/^(\-(\d*))$/.test(e.target.value)){
            setCheckInput({...checkInput,  isCorrectQty: true, isInCorrectQty: false })
            setNewProduct({...newproduct,  Quantity : e.target.value, ProductID : products.arr.length.toString() })
          }else{
            setCheckInput({...checkInput, warringMessage : 'the number must be positive',isCorrectQty: false,  isInCorrectQty: true })
            setNewProduct({...newproduct,  Quantity :0 })
          }
      break ;
      case "CategoryID":
        const obj = data.filter(x=>x.categoryID.toString() === e.currentTarget.value)
        setNewProduct({...newproduct, CategoryID : e.currentTarget.value, CategoryName :obj[0].categoryName,ProductID : products.arr.length.toString()})
        break;
      case "Productdescription":
        setNewProduct({...newproduct, ProductDescription : e.target.value,ProductID : products.arr.length.toString()})
        break;
      default:
        return;
    }
  }
  const onhandleNewProduct = () =>{   
    const checkreplicate = products.arr.filter(x=>x.ProductName === newproduct.ProductName)
    if(checkreplicate.length === 0){
      
      setNewProducts({...products, arr : products.arr.concat(newproduct)})
    }else{
      alert("duplicate item")
    }
    
  }
  const handleMutipleNewProducts = () =>{

     
      console.log(products.arr)
      Axios.post("http://localhost:54142/api/Default/PostNewProducts",products.arr).then((response) => {
        console.log( response.data)
           Axios.post("http://localhost:54142/api/Default/PostPic",response.data).then((result) => {
             let message = ""; 
           products.arr.map((item) =>{
               if(item.ProductID =="0" ){
                message += `${item.ProductName} Insert success \n`;
                  
               }else{
                 message += `${item.ProductName} update success \n`
               }   
            })
         
            alert(message)
          }).catch((error) =>{
              console.log(error)
          })
        }).catch((error) =>{
       console.log(error.response)
       })
     
   }
   
   const options = {
    sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
          text: 'All', value: products.arr.length
       }], 
     sizePerPage: 5,  
      pageStartIndex: 1, 
      paginationSize: 10, 
      prePage: 'Prev', 
      nextPage: 'Next',
      firstPage: 'First', 
     lastPage: 'Last', 
     };
    function onAfterSaveCell(row, cellName, cellValue) {
     
      let index = row["ProductID"]
      
      let objdata = products.arr.filter(x=>x.productID === index)
      console.log(index,objdata)
      switch(cellName){
        case "CategoryName":
          let obj = data.filter(x=>x.categoryName === cellValue)
          objdata[0].CategoryID = obj[0].categoryID
          setNewProducts({...products, arr : products.arr.filter(x=>x.productID !== index).concat(objdata) })
          console.log(products.arr)
          break;
          case "ProductPrice":
            objdata[0].ProductPrice = cellValue
         setNewProducts({...products, arr : products.arr.filter(x=>x.productID !== index).concat(objdata) })
          
          break;
          case "ProductDescription":
            objdata[0].ProductDescription = cellValue
            setNewProducts({...products, arr : products.arr.filter(x=>x.productID !== index).concat(objdata) })
          break;
          case "ProductName":
            objdata[0].ProductName = cellValue
            setNewProducts({...products, arr : products.arr.filter(x=>x.productID !== index).concat(objdata) })
            break;
          case "Quantity":
            objdata[0].Quantity = cellValue
            setNewProducts({...products, arr : products.arr.filter(x=>x.productID !== index).concat(objdata) })
            break;
          default:
            break;
      }

    }
    const handleCancelAction= (index) =>{
      setNewProducts({...products, arr : products.arr.filter(x=>x.ProductID !== index) }) 
    }
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: onAfterSaveCell 
    };
    function DeleteFormatter(cell, row){
      return <Button variant="danger" onClick={() => handleCancelAction(row["ProductID"])}  >Delete</Button>
    }
    function imageFormatter(cell, row){
      return "<img style='width:130px; height:120px;' src='"+cell+"'/>" ;
    }
    return (
    <Form>
        <Form.Row style={{border:"1px solid lightgrey", padding:"10px"}}>
           <Col xs={12} md={12} lg={12} sm={12}>
           <Alert hidden={checkInput.ishidden} variant={"warning"}>
                       {checkInput.warringMessage}
               </Alert>
           </Col>
           <Col xs={12} md={12} lg={12} sm={12}>
               <Row >
               <Col xs md lg sm>
                     <Form.Group controlId="ProductName">
                        <Form.Label>ProductName</Form.Label>      
                        <FormControl
                          aria-label="ProductName"
                           aria-describedby="pricesetting"                
                            onChange ={(e)=> onChagneProductInfo(e)}
                         />  
                      </Form.Group>
                </Col>
                 <Col xs md lg sm>
                       <Form.Group controlId="Price">
                          <Form.Label>Price</Form.Label> 
                          <FormControl
                          aria-label="Price"
                           aria-describedby="pricesetting"
                            type ="number"
                            onChange ={(e)=> onChagneProductInfo(e)}
                            value={newproduct.ProductPrice}
                            isInvalid={checkInput.isInCorrectPrice}
                            isValid = {checkInput.isCorrectPrice}
                          />
                       </Form.Group>
                  </Col> 
                   <Col  xs md lg sm>
                       <Form.Group as={Col} controlId="CategoryID">
                          <Form.Label>Category</Form.Label>
                           <Form.Control as="select"  onChange ={(e)=> onChagneProductInfo(e)}>

                          {
                              data.filter(x=>x.categoryID !== 0).map((item, index)=>(
                              <option key={index} value={item.categoryID}>{item.categoryName}</option>
                            ))
                          }
                           </Form.Control>
                        </Form.Group> 
                   </Col>
               </Row>
               <Row>
                   <Col xs md lg sm>
                      <Form.Group controlId="Quantity">
                        <Form.Label>Quantity</Form.Label> 
                          <FormControl
                              aria-label="Quantity"
                              type ="number"
                            onChange ={(e)=> onChagneProductInfo(e)}
                            value={newproduct.Quantity}
                            isInvalid={checkInput.isInCorrectQty}
                            isValid = {checkInput.isCorrectQty}
                          />   
                       </Form.Group>
                    
                   </Col> 
                   <Col xs md lg sm>
                       <Form.Group controlId="Productdescription">
                          <Form.Label>Product Description</Form.Label> 
                          <FormControl
                              aria-label="Product Description"
                           as="textarea"
                            onChange ={(e)=> onChagneProductInfo(e)}
                            style={{resize:"none"}}
                   
                          />
                        
                         </Form.Group>
                    </Col> 
                    <Col sm md lg xs>
                          <Form.Group controlId="Image">
                              <div className="custom-file" style={{marginTop:"20px", width:"250px", marginLeft:"15px"}}>
                              <input id="inputGroupFile01" type="file" className="custom-file-input" accept="image/x-png,image/jpeg" onChange ={(e) =>handleuploadImage(e)} />
                              <label className="custom-file-label" >{checkInput.imageName === '' ? 'Choose file' :checkInput.imageName }</label>
                              </div>
                        </Form.Group>
                   </Col> 
                </Row>   
             </Col>
             <Col  xs={12} md={12} lg={12} sm={12} >                
              <Row >       
                 <Col  xs md lg sm style={{marginLeft:"50px"}} >
                     <div style={{height:"200px"}}>
                      <Cropper
                        image={imgae.src}
                        crop={crop}
                        zoom={zoom}
                        aspect={6 / 6}
                        rotation={rotation}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onRotationChange={10}
                        onZoomChange={setZoom}
                      />     
                     </div>
                   </Col>  
                  <Col xs md lg sm style={{marginLeft:"50px"}}>
                       <Image src={trimImage.src} style={{height:"200px"}}></Image>
                  </Col>
              </Row>
              <Row style={{marginTop:"20px"}}>
                  <Col xs md lg sm style={{marginLeft:"30px"}}>
                     <div className={styles.sliderContainer}>
                       <Typography
                           variant="overline"
                          classes={{ root: styles.sliderLabel }}
                       >
                        Zoom
                       </Typography>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classes={{ container: styles.slider }}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </div>
           </Col>
        <Col xs md lg sm style={{marginLeft:"30px"}}>
        <div className={styles.sliderContainer}>
          <Typography
            variant="overline"
            classes={{ root: styles.sliderLabel }}
          >
            Rotation
          </Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ container: styles.slider }}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        </Col>
        <Col xs md lg sm style={{marginLeft:"30px"}}>
        <Button
         onClick={() => showCroppedImage()}
          variant="success"
          color="success"
          classes={{ root: styles.cropButton }}
        >
          Trim Image
        </Button>
        <Button
        style={{marginLeft:"10px"}}
        variant="primary"
        color="primary"
        classes={{ root: styles.cropButton }}
        onClick={() => onhandleNewProduct()}
      >
        check in a new product
      </Button>
        </Col>  
        
        </Row> 
        </Col> 
        </Form.Row>
        <Row style={{border:"1px solid lightgrey", marginTop :"10px", marginBottom:"10px", padding:"10px"}}>
          <Col  xs={12} md={12} lg={12} sm={12} style={{marginLeft:"30px", marginTop:"10px"}}>
          <Button
             style={{marginLeft:"10px"}}
              variant="primary"
              color="primary"
              classes={{ root: styles.cropButton }}
              onClick={() => handleMutipleNewProducts()}
              >
               Submit All New Products
            </Button>
          </Col>
          <Col  xs md lg sm style={{marginLeft:"30px", marginTop:"10px"}}>
          <BootstrapTable data={products.arr} version='4' pagination={true} options={ options } key cellEdit={ cellEditProp }>
          <TableHeaderColumn dataField='ProductID' isKey hidden >Product ID</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='ProductName' >Product Name</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField='ProductPrice' >Product Price</TableHeaderColumn>
          <TableHeaderColumn dataSort={true}  dataField="CategoryName" editable={ { type: 'select', options: {  values :["Liquid","Production","Meat"]  } } } >Product Category</TableHeaderColumn>
          <TableHeaderColumn  dataField="ProductDescription"  >Product Description</TableHeaderColumn> 
          <TableHeaderColumn  dataField="ProductImagePath" dataFormat={imageFormatter} editable={ false }>Product Image</TableHeaderColumn> 
          <TableHeaderColumn  dataField="Quantity" >Quantity</TableHeaderColumn>
          <TableHeaderColumn dataFormat={DeleteFormatter} editable={ false }>Action</TableHeaderColumn> 
          </BootstrapTable>  
            </Col>
        </Row>
    
        </Form>
    
       
    )
}

export default App;