
import express from "express"
import { createFile, createFolder, createRootFolder, deleteFile, getFile,renameFolder, getTree, updateFile, deleteFolder } from "../controllers/file.controller.js"

const router = express.Router()

router.post("/create-root-folder", createRootFolder)
router.post("/create-folder", createFolder)
router.post("/create-file", createFile)
router.post("/update/:id", updateFile)
router.post("/rename-folder/:id", renameFolder);
router.delete("/folder/:id", deleteFolder);
router.delete("/:id", deleteFile)
router.get("/:id", getFile)
router.get("/tree/:projectId", getTree)


export default router