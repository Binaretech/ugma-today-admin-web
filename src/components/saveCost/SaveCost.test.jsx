import React from 'react';
import { trans } from '../../trans/trans';
import { render, screen, fireEvent, within } from '../../utils/test-utils';
import SaveCost from './SaveCost';

test('should render dialog', () => {
    const dialog = render(<SaveCost open />);

    expect(dialog).toMatchSnapshot();
});

test('should render dialog without item', () => {
    const { getByText } = render(<SaveCost open />);

    expect(getByText(trans('Components.SaveCost.createPrice'))).toBeInTheDocument();
});
test('should render dialog with item', () => {
    const testItem = {
        name: "Administración",
        comment: "Dormouse, without considering at all this grand procession, came THE KING AND QUEEN OF HEARTS. Alice was soon submitted to by.",
        price: "1251.22",
    };

    const { getByText } = render(<SaveCost item={testItem} open />);

    expect(getByText(trans('Components.SaveCost.updatePrice'))).toBeInTheDocument();
    expect(screen.getByDisplayValue(testItem.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testItem.comment)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testItem.price)).toBeInTheDocument();
});

test('should update item', () => {
    jest.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(() => {
        Promise.resolve({
            message: "ok"
        });
    });
    const testItem = {
        name: "Administración",
        comment: "Dormouse, without considering at all this grand procession, came THE KING AND QUEEN OF HEARTS. Alice was soon submitted to by.",
        price: "1251.22",
    };

    const { getByText } = render(<SaveCost item={testItem} open />);

    expect(getByText(trans('Components.SaveCost.updatePrice'))).toBeInTheDocument();
    expect(screen.getByDisplayValue(testItem.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testItem.comment)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testItem.price)).toBeInTheDocument();

    fireEvent.click(getByText(trans('words.accept')));
});


test('should delete item', () => {
    const testItem = {
        name: "Administración",
        comment: "Dormouse, without considering at all this grand procession, came THE KING AND QUEEN OF HEARTS. Alice was soon submitted to by.",
        price: "1251.22",
    };

    const { getByText, getByRole } = render(<SaveCost item={testItem} open />);

    fireEvent.click(getByText(trans('words.delete')));
    expect(getByText(trans('Components.SaveCost.deleteConfirmationTitle')));
    // TODO: IMPROVE TESTS
});
