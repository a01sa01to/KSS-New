import React from 'react';

class ColumnContainer extends React.Component{
	render(){
		let e;
		if(this.props.images.length !== 0){
			e = (
				<div>
					<div className="imgs hide">
						{this.props.images.map(i=>{
							return(
								<imgload className="image" src={i}></imgload>
							)
						})}
					</div>
					<a href="#" className="show" data-images={this.props.images.length}>画像を表示（{this.props.images.length}枚）</a>
				</div>
			);
		}
		return(
			<div className="columnContainer">
				<p className="title">{this.props.title}</p>
				<p className="date">{this.props.date}</p>
				<p className="body">{this.props.body}</p>
				{e}
			</div>
		)
	}
}

function Render(json){
		// console.log(json);
		return(
			json.j.map(c=>{
				return(<ColumnContainer title={c.title} date={c.date} body={c.body} images={c.images} />)
			})
		)
}

export default Render;