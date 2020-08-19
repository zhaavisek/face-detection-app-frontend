import React,{Component} from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';





const initialState={
      input:'',
      ImageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

      
      loadUser=(data)=>{
        this.setState({user:{
         id:data.id,
         name:data.name,
         email:data.email,
         entries:data.entries,
         joined:data.joined
        }})
      }

      onRouteChange=(route)=>{
        if(route==='signout'){
          this.setState(initialState)
        }else if(route==='home'){
          this.setState({isSignedIn:true})
        }
        this.setState({route:route})
      }


      ClarifaiFaceLocation=(data)=>{
        const ClarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
        const image=document.getElementById('inputimage');
        const width=image.width;
        const height=image.height;
        return{
          leftCol:ClarifaiFace.left_col*width,
          topRow:ClarifaiFace.top_row*height,
          rightCol:width-(ClarifaiFace.right_col*width),
          bottomRow:height-(ClarifaiFace.bottom_row*height)
        }
      }

      DisplayFaceBox=(box)=>{
        console.log(box);
        this.setState({box:box});
      }


      onInputChange=(event)=>{
      this.setState({input:event.target.value});

      }

      onButtonSubmit=()=>{
      this.setState({ImageURL:this.state.input})
          fetch('http://localhost:3001/imageUrl',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              input:this.state.input
            })
          })
          .then(response=>response.json())

      .then(response=>{
        if(response){
          fetch('http://localhost:3001/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
        }
         this.DisplayFaceBox(this.ClarifaiFaceLocation(response))
    })
         .catch(err=>console.log(err)); 
    }

        render(){
        return (

        <div className="App">
         <Particles className='particle'
          params={{
            "particles": {
                "number": {
                    "value": 50
                },
                "size": {
                    "value": 3
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    }
                }
            }
        }} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route==='home'?
        <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} ImageURL={this.state.ImageURL}/>
        </div>
        :(this.state.route==='signin'
          ?<SignIn  loadUser={this.loadUser}  onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        
      }
        </div>

        );

        }

        }

        export default App;
