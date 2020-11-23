import {useState} from 'react';
import {useDispatch} from 'react-redux';
import cleanErrors, { setErrors } from '../../redux/actions/requestActions';
import {useDataManager} from '../../utils/customHooks';
import {useXhr} from '../../utils/xhr/hook';
import requests from '../../utils/xhr/requests';

export function useCostHandling(id, handleClose) {
    const manager = useDataManager();
		const [send] = useXhr(id? requests.cost.update: requests.cost.store);
		const [loading, setLoading] = useState(false);
		const dispatch = useDispatch();
		const [openDelete, setOpenDelete] = useState(false);
		
		function submit() {
			if (manager.hasErrors()) return;

        setLoading(true);
        send({
            body: manager.getData(), params: { id }
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

    function deleteCost() {
        setLoading(true);
        closeDeleteDialog();
        send({
            ...requests.cost.destroy,
            params: { id }
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


		return [manager, loading, submit, openDelete, openDeleteDialog, closeDeleteDialog, deleteCost];
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
