package com.linmoblog.server.Controller;

import com.linmoblog.server.Entity.Note;
import com.linmoblog.server.Entity.Result;
import com.linmoblog.server.Service.NoteService;
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.List;

@RequestMapping(value = "/api/protected/notes")
@RestController
public class NoteController {
    @Autowired
    private NoteService noteService;

    @PostMapping
    public Result<Null> addNote(@RequestBody Note note) {
        return noteService.addNote(note);
    }

    @GetMapping
    public Result<List<Note>> getNoteList() {
        return noteService.getNoteList();
    }

    @GetMapping("/{id}")
    public Result<Note> getNoteById(@PathVariable Integer id) {
        return noteService.getNoteById(id);
    }

    @GetMapping("/page")
    public Result<List<Note>> getNotePages(@RequestParam(defaultValue = "1") Integer page,@RequestParam(defaultValue = "4") Integer pageSize) {
        return noteService.getNotePages(page, pageSize);
    }

    @DeleteMapping
    public Result<Null> deleteNote(@RequestBody List<Integer> notes) {
        return noteService.deleteNote(notes);
    }

    @PostMapping("/{id}")
    public Result<Null> updateNote(@PathVariable Integer id,@RequestBody Note note) {
        return noteService.updateNote(id,note);
    }

    @PostMapping("/search")
    public Result<List<Note>> searchNote(@RequestParam(required = false) String title,
                                         @RequestParam(required = false) String categories,
                                         @RequestParam(required = false) String tagsLab,
                                         @RequestParam(required = false, defaultValue = "-1") int top,
                                         @RequestParam(required = false) Data time,
                                         @RequestParam(required = false) String status) {
        return noteService.searchNote(title, categories, tagsLab, top, time,status);
    }

}
