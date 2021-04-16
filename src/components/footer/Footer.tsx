import { createStyles, IconButton, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import styled from 'styled-components';

import Rules from '../../res/images/image-rules.svg';

const StyledFooter = styled.div`
    width: 100%;
    height: 40px;

    display: flex;
    justify-content: space-between;

    button {
        height: fit-content !important;
        padding: 0.4rem 1.2rem;

        border: solid;
        border-radius: 6px;
        border-width: 2px;
        border-color: rgba(255, 255, 255, 0.493);

        background-color: transparent;

        color: rgb(255, 255, 255);
        font-size: 0.9rem;
        letter-spacing: 2px;
        font-weight: bold;

        font-family: 'Barlow Semi Condensed', sans-serif;
        
        cursor: pointer;

        :focus {
            outline: none !important;
        }
    }
`;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const StyledDialog = styled.div`
  font-weight: bold !important;
  font-size: 2rem !important;
`;

const Footer = () => {

  const [open, setOpen] = useState(false);

  return (<>
    <StyledDialog>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
          RULES
        </DialogTitle>
        <DialogContent >
          <img src={Rules} style={{ width: '320px', height: '270px', padding: '12px' }} alt="Rules"></img>
        </DialogContent>
      </Dialog>
    </StyledDialog>
    <StyledFooter>
      <button style={{ opacity: 0 }}></button>
      <button onClick={(() => setOpen(true))}>RULES</button>
    </StyledFooter>
  </>);
}

export default Footer;