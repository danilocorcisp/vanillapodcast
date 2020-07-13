import React, { useEffect, useState } from "react";

export default function useFriendButton(props, data) {
    const [buttonText, setButtonText] = useState("");

    let text = "";
    if (data.rows < 1) {
        text = "Send friend request"
    } else if (data.rows.accepted) {
        text = "End friendship";
    } else if (data.rows.receiver_id == props.id) {
        text = "Cancel friend request";
    } else ((data.rows.sender_id == props.id)) {
        text = "Accept friend request";
    }

    return [buttonText, setButtonText(text)];
} 