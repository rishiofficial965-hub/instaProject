const fs = require('fs');

async function uploadPost() {
  console.log("Starting upload for RishiRanjan...");

  const loginRes = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "RishiRanjan",
      password: "password123"
    })
  });
  
  if (!loginRes.ok) {
    console.log("Login failed: ", await loginRes.text());
    return;
  }
  
  console.log("RishiRanjan logged in successfully.");

  const cookieHeader = loginRes.headers.get("set-cookie");
  const tokenCookie = cookieHeader ? cookieHeader.split(';')[0] : null;

  if (!tokenCookie) {
    console.log("No token cookie set during login!");
    return;
  }

  const postImages = [
    "https://picsum.photos/800/800?random=10",
    "https://picsum.photos/800/800?random=11",
  ];
  
  for (let i = 0; i < postImages.length; i++) {
    console.log(`Downloading dummy image ${i + 1}...`);
    const imgRes = await fetch(postImages[i]);
    const blob = await imgRes.blob();
    
    const formData = new FormData();
    formData.append("image", blob, `rishipost${i}.jpg`);
    formData.append("caption", "Test post by RishiRanjan via ThunderClient " + (i + 1));

    console.log(`Uploading post ${i + 1}...`);
    const postRes = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: {
        "Cookie": tokenCookie,
      },
      body: formData
    });

    if (postRes.ok) {
      console.log(`RishiRanjan Post ${i + 1} created successfully!`);
    } else {
      console.log(`RishiRanjan Post ${i + 1} failed:`, await postRes.text());
    }
  }
  console.log("Finished uploading!");
}

uploadPost().catch(console.error);
