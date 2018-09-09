package com.example.europa.evactrack;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.List;

public class WarningsAdapter extends RecyclerView.Adapter<WarningsAdapter.ViewHolder> {

    public static final String WARNING = "There are no warnings.";

    // we define a list from the WarningsList java class

    private List<WarningsList> warningsLists;
    private Context context;

    public WarningsAdapter(List<WarningsList> warningsLists, Context context) {

        // generate constructors to initialise the List and Context objects

        this.warningsLists = warningsLists;
        this.context = context;

    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // this method will be called whenever our ViewHolder is created
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.warnings_list, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {

        // this method will bind the data to the ViewHolder from whence it'll be shown to other Views

        final WarningsList warningsList = warningsLists.get(position);
        holder.warning.setText(warningsList.getWarning());
        

        holder.linearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                WarningsList warningsList1 = warningsLists.get(position);
                Intent skipIntent = new Intent(v.getContext(), LoginActivity.class);
                skipIntent.putExtra(WARNING, warningsList1.getWarning());
                v.getContext().startActivity(skipIntent);
            }
        });

    }

    @Override

    //return the size of the listItems (warningsList)

    public int getItemCount() {
        return warningsLists.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder  {

        // define the View objects

        public TextView warning;
        public LinearLayout linearLayout;

        public ViewHolder(View itemView) {
            super(itemView);

            // initialize the View objects

            warning = (TextView) itemView.findViewById(R.id.textWarning);
            linearLayout = (LinearLayout) itemView.findViewById(R.id.linearLayout);
        }

    }
}
