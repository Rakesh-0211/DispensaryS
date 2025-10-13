import "./recordModal.css";
export const RecordModal = (props) => {
  console.log(props);
  return (
    <div className="record-modal">
      <div className="student-modal-report">
        <div>{props.selectedHistory?.student?.name}</div>
        <div>{props.selectedHistory?.student?.email}</div>
        <div>{props.selectedHistory?.roll}</div>
      </div>
      <div className="student-details-scroll">
        <div className="student-modal-detail">
          <div className="student-modal-header">
            {props.selectedHistory?.createdAt
              .slice(0, 10)
              .split(".")
              .reverse()
              .join(".")}
          </div>
        </div>
        <div className="student-modal-body-student">
          <div className="student-modal-body-header">
            <div>Medicine</div>
            <div>Quantity</div>
          </div>
          <div className="student-modal-body-item">
            {props.selectedHistory?.medicines.map((item, index) => {
              return (
                <div className="student-item-modal">
                  <div>{item?.name}</div>
                  <div>{item?.requiredQuantity}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
