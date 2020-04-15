import React from "react";
import { format } from "date-fns";
import "./TomatoList.scss";

interface ITomatoListProps {
  finishedTomatoes: any;
}

const TomatoItem = function(props: any) {
  return (
    <div className="TomatoItem" id="TomatoItem">
      <span className="timeRange">
        {format(props.started_at, "H:mm")} - {format(props.ended_at, "H:mm")}
      </span>
      <span className="description">{props.description}</span>
    </div>
  );
};

const TomatoImg = function(props:any){
  const array = []
  for(let i=0; i<props.count; i++){
    array.push(<img src="/potato/images/tomato.svg"  key={i}  alt=""/>)
  }
  return (
    <span>
      {
        array
      }
    </span>
  )
}

class TomatoList extends React.Component<ITomatoListProps> {
  // constructor(props: any) {
  //   super(props);
  // }
  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
  }
  public render() {
    const list = this.dates.map(d => {
      const tomatoes = this.props.finishedTomatoes[d];
      return (
        <div key={d} className="dailyTomatoes">
          <div className="title">
            <span className="dateTime">{format(d, "M月DD日")}</span>
            <TomatoImg count={tomatoes.length}></TomatoImg>
            <span className="finishedCount">完成了 <strong>{tomatoes.length}</strong> 个番茄</span>
          </div>
          {tomatoes.map((t: any) => (
            <TomatoItem key={t.id} {...t}></TomatoItem>
          ))}
        </div>
      );
    });
    return (
      <div className="TomatoList" id="TomatoList">
        {list}
      </div>
    );
  }
}

export default TomatoList;
