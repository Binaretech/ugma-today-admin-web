import {useState} from 'react';
import {useDispatch} from 'react-redux';
import cleanErrors, {setErrors} from '../../redux/actions/requestActions';
import {useDataManager} from '../../utils/customHooks';
import {useXhr} from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export function useNewsHandling(id, handleClose) {
  const manager = useDataManager();

  if (id) requests.news.update.params = {id};

  const [send] = useXhr(id ? requests.news.update : requests.news.store);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  function submit() {
    if (manager.hasErrors()) return;

    setLoading(true);
    send({
      body: {
        ...manager.getData(),
        ...{type: 2},
      },
      params: {id},
    })
      .then(() => {
        manager.cleanData();
        manager.cleanErrors();
        dispatch(cleanErrors());
        setLoading(false);
        handleClose();
      })
      .catch((response) => {
        dispatch(setErrors(response));
        setLoading(false);
      });
  }

  function deleteNews() {
    setLoading(true);
    closeDeleteDialog();
    send({
      ...requests.news.destroy,
      params: {id},
    })
      .then(() => {
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function closeDeleteDialog() {
    setOpenDelete(false);
  }

  function openDeleteDialog() {
    setOpenDelete(true);
  }

  return [
    manager,
    loading,
    submit,
    openDelete,
    openDeleteDialog,
    closeDeleteDialog,
    deleteNews,
  ];
}

export function useHandleClose(propsHandleClose) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    let id = setTimeout(() => {
      propsHandleClose();
      clearTimeout(id);
    }, 50);
  }

  return [open, handleClose];
}
