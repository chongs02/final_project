import React from "react"

class MovieInfo extends React.Component{
    render(){
        return(
                <div>
                    {this.props.title}
                </div>

        )
    }
}

export default MovieInfo