import React,{useState} from 'react'
import GoogleMapReact from 'google-map-react';
import { Row, Col,InputGroup,FormControl,Button} from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


 const defaultProps = {
    center: { lat: 25.040740, lng:   121.573330},
    zoom: 17
  };
 const renderMarkers =(map, maps) =>{
    return new maps.Marker({
        position: { lat: 25.040740, lng:   121.573330},
        map,
        title: 'location',
       
      });
 }
 const AnyReactComponent = ({ text }) => <div style={{width:"150px"}}><strong>{text}</strong></div>;

const App = () =>{
  const [Info , setInfo] = useState({Email :'', Name :'', Content :''})
  const getEmail = (text) =>{
    console.log(text)
   setInfo({...Info, Email : text})
  }
  const getContent = (text) =>{
   setInfo({...Info, Content : text})
  }
  const getName = (text) =>{
   setInfo({...Info, Name : text})
  }
  const sendfeedback =() => {
    sendEmai(Info.Email, Info.Content, Info.Name)
  
  }
  function sendEmai(EmailTo,Content, Name){
    var template_params = {
      "to_name": Name,
      "message_html": Content,
      "to_email": Info.Email
   }
    window.emailjs.send(
      'yohoo0987_gmail_com', "template_vM4FHXWc",template_params
      ).then(res => {
        console.log('Email successfully sent!')
      }).then(res=>{
        console.log(res)
      })
  }
    return(
        <div>
            <Row>
            <Col sm={12} md={12} lg={12} xs={12}>

            <Row>
               <Col sm={6} md={6} lg={6} xs={6}><strong>Our Address :</strong></Col>
               <Col sm={6} md={6} lg={6} xs={6}><strong>Contact :</strong></Col>
               <Col sm={6} md={6} lg={6} xs={6}>
                    <div style={{ height: '400px', marginTop:"20px" }}> 
              <GoogleMapReact
           bootstrapURLKeys={{ key: "AIzaSyCjlftWbFicL95RL5euPEuDM3IzKyS3rxE" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
          >
               <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text="No. 270, Sec. 5, Zhongxiao E. Rd., Xinyi Dist."
          />
       
                   </GoogleMapReact>
                 </div>
               </Col>
               <Col sm={6} md={6} lg={6} xs={6}> 
               <InputGroup className="mb-3" style={{width:"350px", marginTop:"20px"}}>
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1"  >Email</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Email"
      aria-label="Email"
      aria-describedby="basic-addon1"
      onChange={(e) => getEmail(e.target.value)}
    />
    
  </InputGroup>
  <InputGroup className="mb-3" style={{width:"350px"}}>
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon2">Name</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Name"
      aria-label="Name"
      aria-describedby="basic-addon2"
      onChange={(e) => getName(e.target.value)}
    />
    
  </InputGroup>
  <InputGroup className="mb-3" style={{width:"350px", height:"200px"}}>
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon2">Content</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" style={{resize: "none"}}  aria-label="With textarea"  onChange={(e) => getContent(e.target.value)} />
  </InputGroup>
  <Button variant="primary" onClick={() => sendfeedback()} >submit</Button>
               </Col>
             </Row>
          </Col>  
     
          </Row>

       </div>
    )
}

export default App;