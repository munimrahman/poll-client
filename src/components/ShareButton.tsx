import React, { useState } from "react";
import Button from "./ui/Button";

interface ShareButtonProps {
  pollId: string;
}

export default function ShareButton({ pollId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/polls/${pollId}`;

    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this poll on VanishVote",
          url: url,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          copyToClipboard(url);
        });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="flex items-center"
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
      </svg>
      {copied ? "Copied!" : "Share Poll"}
    </Button>
  );
}
