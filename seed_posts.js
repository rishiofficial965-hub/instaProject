const fs = require('fs');

async function seed() {
  console.log("Seeding started...");
  
  // Register a test user
  const user = {
    username: "testuser_" + Date.now(),
    email: "test" + Date.now() + "@example.com",
    password: "password123",
    bio: "I am a test user created via seed script"
  };

  const regRes = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if (!regRes.ok) {
    console.log("Registration failed: ", await regRes.text());
    return;
  }
  
  console.log("Test user registered successfully: ", user.username);

  // Get token cookie from response
  const cookieHeader = regRes.headers.get("set-cookie");
  const tokenCookie = cookieHeader ? cookieHeader.split(';')[0] : null;

  if (!tokenCookie) {
    console.log("No token cookie set during registration!");
    return;
  }

  // Create 3 posts
  const postImages = [
    "https://picsum.photos/800/800?random=1",
    "https://picsum.photos/800/800?random=2",
    "https://picsum.photos/800/800?random=3"
  ];
  
  for (let i = 0; i < postImages.length; i++) {
    console.log(`Downloading dummy image ${i + 1}...`);
    const imgRes = await fetch(postImages[i]);
    const blob = await imgRes.blob();
    
    const formData = new FormData();
    formData.append("image", blob, "image" + i + ".jpg");
    formData.append("caption", "This is an awesome test post number " + (i + 1) + " generated automatically!");

    console.log(`Uploading post ${i + 1}...`);
    const postRes = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: {
        "Cookie": tokenCookie,
      },
      body: formData
    });

    if (postRes.ok) {
      console.log(`Post ${i + 1} created successfully!`);
    } else {
      console.log(`Post ${i + 1} failed:`, await postRes.text());
    }
  }
  console.log("Finished seeding database with posts!");
}

seed().catch(console.error);
