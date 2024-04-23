import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const Model2 = ({ children, button, title }) => {
  // const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const [open, setOpen] = React.useState(false);

  // const deleteDonation = async ({id}) => {
  //   try {
  //     const response = await fetch(`/api/auth/deletedonation/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (response.ok){
  //       alert("successfully deleted");
  //     }

  //     if (!response.ok) {
  //       throw new Error('Failed to delete donation');
  //     }

  //     console.log('Donation deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting donation:', error.message);
  //   }
  // };
  // deleteDonation()

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-[#7c7cee] font-bold  text-center rounded-[7px] border-[2px] border-[black]"
      >
        {button}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
