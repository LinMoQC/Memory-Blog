package com.linmoblog.server.Dao;

import com.linmoblog.server.Entity.Note;
import com.linmoblog.server.Mapper.NoteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.util.List;

@Repository
public class NoteDao {
    @Autowired
    private NoteMapper noteMapper;

    public void addNote(Note note) {
        noteMapper.addNote(note);
    }

    public List<Note> getNoteList() {
        return noteMapper.getNoteList();
    }

    public void deleteNote(List<Integer> notes) {
        noteMapper.deleteNote(notes);
    }

    public void updateNote(Integer id, Note note) {
        noteMapper.updateNote(id,note);
    }

    public Note getNoteById(Integer id) {
        return noteMapper.getNoteById(id);
    }

    public List<Note> getNotePages(Integer start, Integer pageSize) {
        return noteMapper.getNotePages(start,pageSize);
    }

    public List<Note> searchNote(String title, String categories, String tagsLab, int top, Data time,String status) {
        return noteMapper.searchNote(title,categories,tagsLab,top,time,status);
    }
}
