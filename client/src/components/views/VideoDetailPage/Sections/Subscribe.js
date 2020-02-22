import React, { useEffect, useState } from "react";
import axios from "axios";

function Subscribe(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    };

    // 이미 구독 중이라면
    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribedVariable)
        .then(response => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소를 실패했습니다.");
          }
        });
      // 아직 구독 중이 아니라면
    } else {
      axios
        .post("/api/subscribe/subscribe", subscribedVariable)
        .then(response => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독을 실패했습니다.");
          }
        });
    }
  };

  useEffect(() => {
    const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then(response => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert("Failed to get subscriber Number");
        }
      });

    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then(response => {
        if (response.data.success) {
          setSubscribed(response.data.subcribed);
        } else {
          alert("Failed to get Subscribed Information");
        }
      });
  }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase"
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
