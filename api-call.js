async function getPredictedLabel(processed_t) {
  const landmarks = processed_t.map(lm => [lm.x, lm.y, lm.z]);

  console.log("Sending landmarks:", landmarks);

  const payload = {
    landmarks: landmarks
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("API response:", data);

    // Map your labels to directions
    const labelMap = {
      like: "up",
      dislike: "down",
      two_up: "right",
      two_up_inverted: "left"
    };

    return labelMap[data.predicted_label] || null;

  } catch (error) {
    console.error("Error calling prediction API:", error);
    return null;
  }
}
