package com.example.europa.evactrack;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

public class PersonnelActivity extends MainActivity {

    private String name = "John Doe";
    private String email = "foo@example.com";
    private String address = "1234 Abcd St";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_personnel);
        //super.onCreateDrawer();
        TextView mName = (TextView)findViewById(R.id.user);
        TextView mEmail = (TextView)findViewById(R.id.email);
        TextView mAddress = (TextView)findViewById(R.id.address);

        mName.setText("First Responder: " + name);
        mEmail.setText("Email: " + email);
        mAddress.setText("Address: " + address);
    }

}
