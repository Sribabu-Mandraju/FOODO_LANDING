import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export const Model1 = ({children,button,id}) => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_URL;


  const [open, setOpen] = React.useState(false);

  const deleteDonation = async ({id}) => {
    try {
      const response = await fetch(`/api/auth/deletedonation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok){
        alert("successfully deleted");
      }
  
      if (!response.ok) {
        throw new Error('Failed to delete donation');
      }
  
      console.log('Donation deleted successfully');
    } catch (error) {
      console.error('Error deleting donation:', error.message);
    }
  };
  deleteDonation()
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen}  className="bg-[#810b0b]">
        {button}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          {children}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => {
            if(id != ""){
                deleteDonation()
            }
            // handleOpen();
            
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}