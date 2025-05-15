const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET endpoint that triggers a POST request
app.get('/trigger-post', async (req, res) => {
  const { id, start_date, status,conversation_id } = req.query;

  if (!id || !start_date || !status) {
    return res.status(400).json({ error: 'Missing required query parameters: id, start_date, status' });
  }

  try {
    const postData = {
      id,
      start_date,
      status,
      conversation_id
    };

    const response = await fetch('https://automation-cloud.tactful.ai/flows/68214/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'ce9df86a3dfb564ccedbb3bfa682dd8c74c467a8a5cc6c50b6e7a10223e7a1ef'
      },
      body: JSON.stringify(postData)
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: result });
    }

    res.json({ message: 'POST request successful', data: result });
  } catch (error) {
    console.error('Error calling POST endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
