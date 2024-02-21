package com.linmoblog.server.Mapper;

import com.linmoblog.server.Entity.Note;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.crypto.Data;
import java.util.List;

@Mapper
public interface NoteMapper {

    @Insert("insert notes (note_title,note_content,cover,description,note_category,note_tags,is_top,status,create_time,update_time) " +
            "values (#{noteTitle},#{noteContent},#{cover},#{description},#{noteCategory},#{noteTags},#{isTop},#{status},#{createTime},#{updateTime})")
    void addNote(Note note);

    @Select("select * from notes")
    List<Note> getNoteList();


    void deleteNote(List<Integer> notesList);

    void updateNote(Integer id, Note note);

    @Select("select * from notes where note_key = #{id}")
    Note getNoteById(Integer id);

    @Select("SELECT * FROM notes ORDER BY update_time DESC LIMIT #{start}, #{pageSize}")
    List<Note> getNotePages(Integer start, Integer pageSize);

    List<Note> searchNote(String title, String categories, String tagsLab, int top, Data time,String status);
}
