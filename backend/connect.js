const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://rak:rak123@cluster0.x1jyq7a.mongodb.net/dis?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
