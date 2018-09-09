package com.example.europa.evactrack;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

public class UserActivity extends MainActivity {

    private String name = "John Doe";
    private String email = "foo@example.com";
    private String address = "1234 Abcd St";
    private String houseSize = "5 house members";
    private String petSize = "2 pets";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);
        //AppBar mActionBarToolbar = (AppBar) findViewById(R.id.app_bar);
        //setSupportActionBar(mActionBarToolbar);
        //getSupportActionBar().setTitle("My title");
        //super.onCreateDrawer();

        TextView mName = (TextView)findViewById(R.id.user);
        TextView mEmail = (TextView)findViewById(R.id.email);
        TextView mAddress = (TextView)findViewById(R.id.address);
        TextView mHouseSize = (TextView)findViewById(R.id.housemembers);
        TextView mPetSize = (TextView)findViewById(R.id.petmembers);


        mName.setText("Owner: " + name);
        mEmail.setText("Email: " + email);
        mAddress.setText("Address: " + address);
        mHouseSize.setText("House Members: " + houseSize);
        mPetSize.setText("Pets: " + petSize);

    }
}
