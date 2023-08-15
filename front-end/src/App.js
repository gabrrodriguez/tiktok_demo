import './App.css';
import React, { Component } from 'react'

class App extends Component {
  state = {
    selectedFile: null, 
    fileSuccessfullyUploaded: false
  }

  onFileChange = (event) => {
    this.setState({selectedFile: event.target.files[0]})
    console.log(this.state.selectedFile)
  }

  fileData = () => {
    if(this.state.selectedFile){
      return(
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Size: {this.state.selectedFile.size}</p>
          <p>Last Modified: { " "} {this.state.selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      )
    } else if ( this.state.fileSuccessfullyUploaded) {
      return(
        <div>
          <br />
          <h4>Your file has been successfully uploaded.</h4>
        </div>
      )
    } else {
      return(
        <div>
          <br/>
          <h4>Please choose a file and then press the Upload button.</h4>
      </div>
      )
    }
  }

  onFileUpload = () => {
    const formData = new FormData()
    formData.append(
      "demo file",
      this.state.selectedFile,
      this.state.selectedFile.name
    )
    // call the api
    console.log(formData)
    this.setState({selectedFile: null})
    this.setState({fileSuccessfullyUploaded: true})

  }

  render() {
    return(
      <div className="App">
        <h2>TikTok File Uploader</h2>
        <div>
          <input type="file" onChange={this.onFileChange}/>
          <button onClick={this.onFileUpload}>Upload</button>
        </div>
        {this.fileData()}
      </div>
    )
  }

}

export default App;
