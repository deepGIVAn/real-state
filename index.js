// yarn add cookie-parser cors dotenv express express-async-handler express-oauth2-jwt-bearer nodemon prisma @prisma/client
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/',(req,res)=>{
  console.log("Final Working here .. --",new Date().toLocaleString());
  res.send('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAwADADASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAYBAgQFA//EAC0QAAICAgEBBQYHAAAAAAAAAAECAAMEEQUSBhQhNUExUXJzscETMkJhcYGR/8QAGAEAAwEBAAAAAAAAAAAAAAAAAgMEBQH/xAAgEQACAgEEAwEAAAAAAAAAAAAAAQIDEQQhMTISIkFx/9oADAMBAAIRAxEAPwDh11pVWtdahVUaAA9ktCE3SAJBOhsyYodp+RtszWwkcrVUB1AfqJG/GLtsVccsKMfJ4GnvmLvXead+7rEu6JdWUdQ6MNEHxBERMfheRyqRdTjFkb2EsBv/AEx6x1ZMapGGmVACP31AqslZnKwdnFR4Z6QhCUAGXL5LDwXVMm8Vsw2AQTsf1Enlr68nlL7qm6kdtg+/wjF2g4fK5LJqsx+jSJo9Ta9YrZOPZiZD0W660Ojo7EztVKb2a2KKkufo28fzfG08dj1WZSq6VKGHSfA6/idkHY2Il4nZzNvSm8Cv8KwBvzeOjHWU0SnJeywLsUU9ghK12JbWtlbBlYbBHrLR4sIhc751lfH9hH2IXO+dZXx/YSTV9F+jqew5cV5TifJX6TXMnFeU4nyV+k02WJVW1ljBVUbJPpKY9UKfJ//Z');
})

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
// app.use(cors({credentials: true, origin: 'http://localhost:8081'}));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
