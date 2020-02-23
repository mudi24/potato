import React from "react";
import { format } from "date-fns";

interface ITomatoListProps {
  finishedTomatoes: any;
}

const TomatoItem = function(props: any) {
  return (
    <div>
      <span>
        {format(props.started_at, "H:mm")}-{format(props.ended_at, "H:mm")}
      </span>
      <span>{props.description}</span>
    </div>
  );
};

class TomatoList extends React.Component<ITomatoListProps> {
  constructor(props: any) {
    super(props);
  }
  get dates() {
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a, b) => Date.parse(b) - Date.parse(a)).splice(0, 3);
  }
  public render() {
    const list = this.dates.map(d => {
      const tomatoes = this.props.finishedTomatoes[d];
      return (
        <div key={d}>
          <div className="title">
            <span>{d}</span>
            <span>完成了{tomatoes.length}个番茄</span>
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
