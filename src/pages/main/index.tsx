import React from 'react';
import PrimarySearchAppBar from "../../components/navbar";
import { NewPostParams, createAPost, listAllPosts, listPostsByUser } from '../../services/post.service';
import RecipeReviewCard from '../../components/card';
import { Button, Grid, TextField } from '@mui/material';
import { notifyFail, notifySuccess } from '../../utils/toast';

export default function MainPage(): JSX.Element {
  const [posts, setPosts] = React.useState([]);
  const [name, setName] = React.useState<string>('');
  const [rawPost, setRawPost] = React.useState<NewPostParams>({
    title: '',
    content: '',
  })

  function disableButton() {
    return !rawPost.title || !rawPost.content;
  }

  async function listPosts() {
    const response = await listAllPosts();
    setPosts(response.body);
  }

  async function listPostByUser() {
    const response = await listPostsByUser(name);
    setPosts(response.body);
  }

  async function createNewPost() {
    const response = await createAPost(rawPost);
      setRawPost({
        title: '',
        content: ''
      });

      if (response.status >= 400) {
        notifyFail(response.message)();
      } else {
        notifySuccess(response.message)();
      }

      await listPosts();
  }

  React.useEffect(() => {
    listPosts();
  }, []);

  React.useEffect(() => {
    if (!name) {
      listPosts();
    } else {
      listPostByUser();
    }
  }, [name])

  function handleRawPost(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    setRawPost((prev) => ({...prev, [field]: e.target.value}));
  }

  return (
    <React.Fragment>
      <PrimarySearchAppBar name={name} setName={setName} ></PrimarySearchAppBar>
      <Grid container spacing={1} sx={{ padding: 16, paddingY: 4, background: '#EFEFEF', height: '100vh', overflowY: 'scroll' }}>
        <React.Fragment>
          <Grid item xs={12}>
            <TextField
              sx={{ background: '#FFF' }}
              id="outlined-basic"
              label="Título da postagem"
              variant="outlined"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRawPost(e, 'title')}
              value={rawPost.title}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="O que está acontecendo?"
              placeholder="Escreva sua postagem"
              multiline
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRawPost(e, 'content')}
              value={rawPost.content}
              rows={4}
              maxRows={4}
              sx={{ background: '#FFF' }}
            />
          </Grid>
          <Grid sx={{ justifyContent: 'flex-end', display: 'flex', marginBottom: 4 }} item xs={12}>
            <Button variant='outlined' sx={{
              textTransform: 'none',
              backgroundColor: '#1AA0B9',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0E7386'
              },
              '&:disabled': {
                backgroundColor: '#ddd'
              }
            }} disabled={disableButton()} onClick={createNewPost}>Postar</Button>
          </Grid>
          {posts && posts.length ? posts.map((post) => (
            <Grid item md={12} lg={6} xs={12} xl={6}>
              <RecipeReviewCard post={post} />
            </Grid>
          )) : <></>}
        </React.Fragment>
      </Grid>
    </React.Fragment>
  )
}