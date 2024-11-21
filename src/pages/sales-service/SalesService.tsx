import { createSignal } from "solid-js";

import "./salesService.css";

import AddNewButtonStack from "../../components/addNewButtonStack/AddNewButtonStack";
import DialogBox from "../../components/dialogBox/DialogBox";

export default function SalesService() {
  const [addNewSaleClicked, setAddNewSaleClicked] = createSignal(false);
  const [addNewServiceClicked, setAddNewServiceClicked] = createSignal(false);

  return (
    <div class="sales-service-page" data-testid="sales-service-page">
      <h2>Sales and service</h2>

      <DialogBox
        isDialogVisible={addNewSaleClicked}
        setDialogVisiblity={setAddNewSaleClicked}
      >
        <h1>Sale</h1>
      </DialogBox>
      <DialogBox
        isDialogVisible={addNewServiceClicked}
        setDialogVisiblity={setAddNewServiceClicked}
      >
        <h1>Service</h1>
      </DialogBox>

      <AddNewButtonStack
        setAddNewSaleClicked={setAddNewSaleClicked}
        setAddNewServiceClicked={setAddNewServiceClicked}
      />
    </div>
  );
}
