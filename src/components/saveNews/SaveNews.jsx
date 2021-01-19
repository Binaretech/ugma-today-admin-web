import React from 'react';
import Loader from '../loader/Loader';
import {
  Button,
  Dialog,
  Slide,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import Input from '../input/Input';
import MarkdownEditor from '../../components/markdownEditor';
import {trans} from '../../trans/trans';
import styles from './SaveNews.module.css';
import {useNewsHandling, useHandleClose} from './functions.js';
import {useWindowSize} from '../../utils/customHooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @typedef {object} Props
 * @prop {boolean} open
 * @prop {object} item
 * @prop {function() => void} handleClose
 *
 * @param {Props} props
 */
function SaveNews(props) {
  const [open, handleClose] = useHandleClose(props.handleClose);
  const [width] = useWindowSize();

  const [
    manager,
    loading,
    submit,
    openDelete,
    openDeleteDialog,
    closeDeleteDialog,
    deleteNews,
  ] = useNewsHandling(props.item?.id, props.handleClose);

  function onChange(value) {
    manager.setValue('content', value);
  }

  function deleteConfirmation() {
    return (
      <Dialog
        open={openDelete}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>
          {trans('Components.SaveNews.deleteConfirmationTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {trans('Components.SaveNews.deleteConfirmation')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            {trans('words.cancel')}
          </Button>
          <Button color="primary" onClick={deleteNews}>
            {trans('words.accept')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      {props.item && deleteConfirmation()}

      <Dialog
        fullScreen={width > 640 ? false : true}
        open={open}
        TransitionComponent={Transition}
        fullWidth>
        <DialogTitle>
          {props.item
            ? trans('Components.SaveNews.updateNews')
            : trans('Components.SaveNews.createNews')}
        </DialogTitle>

        <div>
          {loading && <Loader fullscreen />}
          <div>
            <form autoComplete="off" className={styles.form}>
              <div className={styles.row}>
                <Input
                  name="title"
                  label={trans('words.title')}
                  rules={['required', 'string', 'min:3', 'max:150']}
                  defaultValue={props.item?.title}
                  setValue={manager.setValue}
                  setError={manager.setError}
                />
              </div>
              <div className={styles.row}>
                <MarkdownEditor
                  onChange={onChange}
                  value={props.item?.content}
                />
              </div>
              <div className={styles.buttoncontainer}>
                <Button variant="outlined" onClick={submit}>
                  {trans('words.accept')}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <DialogActions>
          {props.item && (
            <Button onClick={openDeleteDialog} color="secondary">
              {trans('words.delete')}
            </Button>
          )}
          <Button onClick={handleClose} color="primary">
            {trans('words.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SaveNews;
