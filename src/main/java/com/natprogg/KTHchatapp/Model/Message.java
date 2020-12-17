package com.natprogg.KTHchatapp.Model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "message")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Message.findAll", query = "SELECT m FROM Message m"),
    @NamedQuery(name = "Message.findByIdmessage", query = "SELECT m FROM Message m WHERE m.idmessage = :idmessage"),
    @NamedQuery(name = "Message.findByUsername", query = "SELECT m FROM Message m WHERE m.username = :username"),
    @NamedQuery(name = "Message.findByRoom", query = "SELECT m FROM Message m WHERE m.room = :room"),
    @NamedQuery(name = "Message.findByMessageText", query = "SELECT m FROM Message m WHERE m.messageText = :messageText")})
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idmessage")
    private Integer idmessage;
    @Basic(optional = false)
    @Column(name = "username")
    private String username;
    @Basic(optional = false)
    @Column(name = "room")
    private String room;
    @Basic(optional = false)
    @Column(name = "messageText")
    private String messageText = "";

    public Message() {
    }

    public Message(Integer idmessage) {
        this.idmessage = idmessage;
    }

    public Message(Integer idmessage, String username, String room, String messageText) {
        this.idmessage = idmessage;
        this.username = username;
        this.room = room;
        this.messageText = messageText;
    }

    public Integer getIdmessage() {
        return idmessage;
    }

    public void setIdmessage(Integer idmessage) {
        this.idmessage = idmessage;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idmessage != null ? idmessage.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Message)) {
            return false;
        }
        Message other = (Message) object;
        if ((this.idmessage == null && other.idmessage != null) || (this.idmessage != null && !this.idmessage.equals(other.idmessage))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.natprogg.KTHchatapp.Model.Message[ idmessage=" + idmessage + " ]";
    }
    
}
