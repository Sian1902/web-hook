const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET endpoint that triggers a POST request
app.get('/trigger-post', async (req, res) => {
  const { id, start_date, status } = req.query;

  if (!id || !start_date || !status) {
    return res.status(400).json({ error: 'Missing required query parameters: id, start_date, status' });
  }

  try {
    const postData = {
      id,
      start_date,
      status
    };

    const response = await fetch('https://automation-cloud.qa.dev.tactful.ai/flows/302662/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'b4679acde1a6f849e8c51e9143d3d082d18a5674330b5dc85b1b1726c5e119e4'
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
