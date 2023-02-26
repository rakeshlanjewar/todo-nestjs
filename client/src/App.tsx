import { useEffect, useRef, useState } from 'react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';
import { Todo } from './todo.interface';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const textRef = useRef<HTMLInputElement>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadTodos = async () => {
    const res = await axios.get('/api/todos');

    setTodos(res.data);
    setIsLoading(false);
  };

  const addTodo = async () => {
    if (!textRef.current) return;

    if (!textRef.current.value) {
      handleClickOpen();
      return;
    }

    setIsLoading(true);

    const res = await axios.post('/api/todos', {
      title: textRef.current.value,
    });

    textRef.current.value = '';

    loadTodos();
  };

  const deleteTodo = async (id: number) => {
    setIsLoading(true);
    const res = await axios.delete(`/api/todos/${id}`);
    setTodos(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div style={{ flex: 1 }}></div>
        <div style={{ flex: 2 }}>
          <Card style={{ minHeight: 500 }}>
            <div
              style={{
                textAlign: 'center',
                padding: 30,
              }}
            >
              <Typography variant="h5" component="h2">
                My To Do List
              </Typography>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 10,
                }}
              >
                <TextField
                  id="filled-basic"
                  label="Title"
                  variant="filled"
                  inputRef={textRef}
                  fullWidth
                  color="success"
                />
                <Button
                  variant="contained"
                  onClick={addTodo}
                  style={{ marginLeft: 8 }}
                  color="success"
                >
                  Add
                </Button>
              </div>
            </div>

            <Divider />

            <div>
              {isLoading ? (
                <div style={{ alignItems: 'center', textAlign: 'center' }}>
                  <CircularProgress />
                </div>
              ) : todos.length === 0 ? (
                <div style={{ alignItems: 'center', textAlign: 'center' }}>
                  <Typography variant="h5" component="h2">
                    Whoohoo, No todos !
                  </Typography>
                </div>
              ) : (
                todos.map((todo) => (
                  <ListItemButton key={todo.id}>
                    <ListItemText primary={todo.title} />
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </ListItemButton>
                ))
              )}
            </div>
          </Card>
        </div>
        <div
          style={{
            flex: 1,
          }}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter a todo first
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
