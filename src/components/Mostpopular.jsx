import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import MyContext from "../context/Context";
import moment from "moment";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Mostpopular = () => {
  const context = useContext(MyContext);
  const { mode, Getblog } = context;
  const [expanded, setExpanded] = useState({});
  const handleExpandClick = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };
  const navigate = useNavigate();
  return (
    <Card style={{background: mode === "dark"?"rgb(51, 54, 61)":""}} sx={{gap:"1rem",display:"flex",flexDirection:"column", width: "250px",height:"100%" }}>
      {Getblog?.map((item) => (
        <div key={item.id} style={{background: mode === "dark"?"rgb(89, 91, 95)":""}}>
          <CardHeader
          style={{padding:"10px"}}
            avatar={<Avatar src={item.imgURL} aria-label="recipe"></Avatar>}
            title={item.author}
            subheader= {moment(item.timestamp.toDate()).format("DD/MM/YYYY")}
          />
          <CardMedia
            component="img"
            height="194"
            onClick={()=>navigate(`/detail/${item.id}`)}
            src={item.imageURL}
            alt="Paella dish"
            style={{padding:"10px"}}
            sx={{width:"100%",cursor:"pointer"}}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            {item.description.substring(0,3)+"..."}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{width:"250px",height:"50px"}}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <ExpandMore
               expand={expanded[item.id] || false}
               onClick={() => handleExpandClick(item.id)}
               aria-expanded={expanded[item.id] || false}
              aria-label="show more"
              
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[item.id] || false} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
              {item.description}
              </Typography>
            </CardContent>
          </Collapse>
        </div>
      ))}
    </Card>
  );
};

export default Mostpopular;
